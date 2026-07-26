package com.uniflat.service.impl;

import com.uniflat.dto.request.InquiryRequest;
import com.uniflat.dto.response.FlatResponse;
import com.uniflat.dto.response.InquiryResponse;
import com.uniflat.dto.response.UserSummaryResponse;
import com.uniflat.entity.*;
import com.uniflat.exception.BadRequestException;
import com.uniflat.exception.ResourceNotFoundException;
import com.uniflat.exception.UnauthorizedException;
import com.uniflat.repository.FlatRepository;
import com.uniflat.repository.InquiryRepository;
import com.uniflat.repository.UserRepository;
import com.uniflat.service.EmailService;
import com.uniflat.service.FlatService;
import com.uniflat.service.InquiryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final FlatRepository flatRepository;
    private final UserRepository userRepository;
    private final FlatService flatService;
    private final EmailService emailService;

    public InquiryServiceImpl(InquiryRepository inquiryRepository,
                               FlatRepository flatRepository,
                               UserRepository userRepository,
                               FlatService flatService,
                               EmailService emailService) {
        this.inquiryRepository = inquiryRepository;
        this.flatRepository = flatRepository;
        this.userRepository = userRepository;
        this.flatService = flatService;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public InquiryResponse createInquiry(InquiryRequest inquiryRequest, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));

        Flat flat = flatRepository.findById(inquiryRequest.getFlatId())
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", inquiryRequest.getFlatId()));

        if (flat.getLandlord().getId().equals(student.getId())) {
            throw new BadRequestException("Landlords cannot submit inquiries for their own flat listings!");
        }

        if (inquiryRepository.existsByStudentAndFlat(student, flat)) {
            throw new BadRequestException("You have already submitted an inquiry for this flat!");
        }

        Inquiry inquiry = Inquiry.builder()
                .flat(flat)
                .student(student)
                .message(inquiryRequest.getMessage())
                .preferredMoveInDate(inquiryRequest.getPreferredMoveInDate())
                .status(InquiryStatus.PENDING)
                .build();

        Inquiry savedInquiry = inquiryRepository.save(inquiry);

        // Send Email Notification to Landlord
        emailService.sendInquiryNotificationToLandlord(
                flat.getLandlord().getEmail(),
                flat.getLandlord().getFullName(),
                student.getFullName(),
                student.getEmail(),
                student.getPhone(),
                flat.getTitle(),
                inquiry.getMessage(),
                inquiry.getPreferredMoveInDate() != null ? inquiry.getPreferredMoveInDate().toString() : "Not specified"
        );

        return mapToInquiryResponse(savedInquiry);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InquiryResponse> getStudentInquiries(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));
        List<Inquiry> inquiries = inquiryRepository.findByStudentOrderByCreatedAtDesc(student);
        return inquiries.stream().map(this::mapToInquiryResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InquiryResponse> getLandlordInquiries(String landlordEmail) {
        User landlord = userRepository.findByEmail(landlordEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", landlordEmail));
        List<Flat> flats = flatRepository.findByLandlord(landlord);
        List<Inquiry> inquiries = inquiryRepository.findByFlatInOrderByCreatedAtDesc(flats);
        return inquiries.stream().map(this::mapToInquiryResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InquiryResponse updateInquiryStatus(Long inquiryId, InquiryStatus status, String userEmail) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry", "id", inquiryId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        boolean isLandlord = inquiry.getFlat().getLandlord().getId().equals(user.getId());
        boolean isStudent = inquiry.getStudent().getId().equals(user.getId());

        if (!isLandlord && !isStudent && user.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("You are not authorized to update this inquiry status");
        }

        inquiry.setStatus(status);
        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return mapToInquiryResponse(updatedInquiry);
    }

    private InquiryResponse mapToInquiryResponse(Inquiry inquiry) {
        FlatResponse flatResponse = flatService.getFlatById(inquiry.getFlat().getId());

        UserSummaryResponse studentSummary = UserSummaryResponse.builder()
                .id(inquiry.getStudent().getId())
                .email(inquiry.getStudent().getEmail())
                .fullName(inquiry.getStudent().getFullName())
                .phone(inquiry.getStudent().getPhone())
                .avatarUrl(inquiry.getStudent().getAvatarUrl())
                .role(inquiry.getStudent().getRole())
                .build();

        return InquiryResponse.builder()
                .id(inquiry.getId())
                .flat(flatResponse)
                .student(studentSummary)
                .message(inquiry.getMessage())
                .preferredMoveInDate(inquiry.getPreferredMoveInDate())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }
}
