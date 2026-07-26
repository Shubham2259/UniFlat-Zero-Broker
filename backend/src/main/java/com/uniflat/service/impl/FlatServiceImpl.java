package com.uniflat.service.impl;

import com.uniflat.dto.request.FlatRequest;
import com.uniflat.dto.response.FlatResponse;
import com.uniflat.dto.response.UserSummaryResponse;
import com.uniflat.entity.*;
import com.uniflat.exception.ResourceNotFoundException;
import com.uniflat.exception.UnauthorizedException;
import com.uniflat.repository.AmenityRepository;
import com.uniflat.repository.FlatImageRepository;
import com.uniflat.repository.FlatRepository;
import com.uniflat.repository.UserRepository;
import com.uniflat.service.FlatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FlatServiceImpl implements FlatService {

    private final FlatRepository flatRepository;
    private final UserRepository userRepository;
    private final AmenityRepository amenityRepository;
    private final FlatImageRepository flatImageRepository;

    public FlatServiceImpl(FlatRepository flatRepository,
                           UserRepository userRepository,
                           AmenityRepository amenityRepository,
                           FlatImageRepository flatImageRepository) {
        this.flatRepository = flatRepository;
        this.userRepository = userRepository;
        this.amenityRepository = amenityRepository;
        this.flatImageRepository = flatImageRepository;
    }

    @Override
    @Transactional
    public FlatResponse createFlat(FlatRequest flatRequest, String landlordEmail) {
        User landlord = userRepository.findByEmail(landlordEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", landlordEmail));

        if (landlord.getRole() != Role.ROLE_LANDLORD && landlord.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("Only registered landlords can create flat listings");
        }

        Set<Amenity> amenities = new HashSet<>();
        if (flatRequest.getAmenityIds() != null && !flatRequest.getAmenityIds().isEmpty()) {
            amenities = new HashSet<>(amenityRepository.findAllById(flatRequest.getAmenityIds()));
        }

        Flat flat = Flat.builder()
                .title(flatRequest.getTitle())
                .description(flatRequest.getDescription())
                .address(flatRequest.getAddress())
                .city(flatRequest.getCity())
                .nearestUniversity(flatRequest.getNearestUniversity())
                .distanceToUniversityKm(flatRequest.getDistanceToUniversityKm())
                .rentAmount(flatRequest.getRentAmount())
                .depositAmount(flatRequest.getDepositAmount())
                .bedrooms(flatRequest.getBedrooms())
                .bathrooms(flatRequest.getBathrooms())
                .furnishingStatus(flatRequest.getFurnishingStatus())
                .availableFrom(flatRequest.getAvailableFrom())
                .isAvailable(true)
                .landlord(landlord)
                .amenities(amenities)
                .images(new ArrayList<>())
                .build();

        Flat savedFlat = flatRepository.save(flat);

        if (flatRequest.getImageUrls() != null && !flatRequest.getImageUrls().isEmpty()) {
            List<FlatImage> images = new ArrayList<>();
            for (int i = 0; i < flatRequest.getImageUrls().size(); i++) {
                images.add(FlatImage.builder()
                        .imageUrl(flatRequest.getImageUrls().get(i))
                        .isPrimary(i == 0)
                        .flat(savedFlat)
                        .build());
            }
            flatImageRepository.saveAll(images);
            savedFlat.setImages(images);
        }

        return mapToFlatResponse(savedFlat);
    }

    @Override
    @Transactional
    public FlatResponse updateFlat(Long flatId, FlatRequest flatRequest, String userEmail) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        if (!flat.getLandlord().getId().equals(user.getId()) && user.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("You are not authorized to update this flat listing");
        }

        flat.setTitle(flatRequest.getTitle());
        flat.setDescription(flatRequest.getDescription());
        flat.setAddress(flatRequest.getAddress());
        flat.setCity(flatRequest.getCity());
        flat.setNearestUniversity(flatRequest.getNearestUniversity());
        flat.setDistanceToUniversityKm(flatRequest.getDistanceToUniversityKm());
        flat.setRentAmount(flatRequest.getRentAmount());
        flat.setDepositAmount(flatRequest.getDepositAmount());
        flat.setBedrooms(flatRequest.getBedrooms());
        flat.setBathrooms(flatRequest.getBathrooms());
        flat.setFurnishingStatus(flatRequest.getFurnishingStatus());
        flat.setAvailableFrom(flatRequest.getAvailableFrom());

        if (flatRequest.getAmenityIds() != null) {
            Set<Amenity> amenities = new HashSet<>(amenityRepository.findAllById(flatRequest.getAmenityIds()));
            flat.setAmenities(amenities);
        }

        if (flatRequest.getImageUrls() != null) {
            flatImageRepository.deleteAll(flat.getImages());
            flat.getImages().clear();
            List<FlatImage> images = new ArrayList<>();
            for (int i = 0; i < flatRequest.getImageUrls().size(); i++) {
                images.add(FlatImage.builder()
                        .imageUrl(flatRequest.getImageUrls().get(i))
                        .isPrimary(i == 0)
                        .flat(flat)
                        .build());
            }
            flatImageRepository.saveAll(images);
            flat.setImages(images);
        }

        Flat updatedFlat = flatRepository.save(flat);
        return mapToFlatResponse(updatedFlat);
    }

    @Override
    @Transactional
    public void deleteFlat(Long flatId, String userEmail) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        if (!flat.getLandlord().getId().equals(user.getId()) && user.getRole() != Role.ROLE_ADMIN) {
            throw new UnauthorizedException("You are not authorized to delete this flat listing");
        }

        flatRepository.delete(flat);
    }

    @Override
    @Transactional(readOnly = true)
    public FlatResponse getFlatById(Long flatId) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));
        return mapToFlatResponse(flat);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FlatResponse> searchFlats(String keyword, String city, String university, BigDecimal minRent, BigDecimal maxRent,
                                          Integer bedrooms, FurnishingStatus furnishingStatus, Pageable pageable) {
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        String cleanCity = (city != null && !city.trim().isEmpty()) ? city.trim() : null;
        String cleanUniv = (university != null && !university.trim().isEmpty()) ? university.trim() : null;

        Page<Flat> flats = flatRepository.searchFlats(cleanKeyword, cleanCity, cleanUniv, minRent, maxRent, bedrooms, furnishingStatus, pageable);
        return flats.map(this::mapToFlatResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FlatResponse> getLandlordFlats(String landlordEmail) {
        User landlord = userRepository.findByEmail(landlordEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", landlordEmail));
        List<Flat> flats = flatRepository.findByLandlord(landlord);
        return flats.stream().map(this::mapToFlatResponse).collect(Collectors.toList());
    }

    private FlatResponse mapToFlatResponse(Flat flat) {
        List<String> imageUrls = flat.getImages() != null
                ? flat.getImages().stream().map(FlatImage::getImageUrl).collect(Collectors.toList())
                : Collections.emptyList();

        UserSummaryResponse landlordSummary = UserSummaryResponse.builder()
                .id(flat.getLandlord().getId())
                .email(flat.getLandlord().getEmail())
                .fullName(flat.getLandlord().getFullName())
                .phone(flat.getLandlord().getPhone())
                .avatarUrl(flat.getLandlord().getAvatarUrl())
                .role(flat.getLandlord().getRole())
                .build();

        return FlatResponse.builder()
                .id(flat.getId())
                .title(flat.getTitle())
                .description(flat.getDescription())
                .address(flat.getAddress())
                .city(flat.getCity())
                .nearestUniversity(flat.getNearestUniversity())
                .distanceToUniversityKm(flat.getDistanceToUniversityKm())
                .rentAmount(flat.getRentAmount())
                .depositAmount(flat.getDepositAmount())
                .bedrooms(flat.getBedrooms())
                .bathrooms(flat.getBathrooms())
                .furnishingStatus(flat.getFurnishingStatus())
                .availableFrom(flat.getAvailableFrom())
                .isAvailable(flat.isAvailable())
                .landlord(landlordSummary)
                .imageUrls(imageUrls)
                .amenities(flat.getAmenities())
                .createdAt(flat.getCreatedAt())
                .updatedAt(flat.getUpdatedAt())
                .build();
    }
}
