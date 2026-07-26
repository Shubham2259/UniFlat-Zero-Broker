package com.uniflat.service.impl;

import com.uniflat.dto.request.ReviewRequest;
import com.uniflat.dto.response.ReviewResponse;
import com.uniflat.dto.response.UserSummaryResponse;
import com.uniflat.entity.Flat;
import com.uniflat.entity.Review;
import com.uniflat.entity.User;
import com.uniflat.exception.ResourceNotFoundException;
import com.uniflat.repository.FlatRepository;
import com.uniflat.repository.ReviewRepository;
import com.uniflat.repository.UserRepository;
import com.uniflat.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final FlatRepository flatRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             FlatRepository flatRepository,
                             UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.flatRepository = flatRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ReviewResponse addReview(Long flatId, ReviewRequest reviewRequest, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));

        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));

        Review review = Review.builder()
                .flat(flat)
                .student(student)
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .build();

        Review savedReview = reviewRepository.save(review);
        return mapToReviewResponse(savedReview);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsForFlat(Long flatId) {
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));

        List<Review> reviews = reviewRepository.findByFlatOrderByCreatedAtDesc(flat);
        return reviews.stream().map(this::mapToReviewResponse).collect(Collectors.toList());
    }

    private ReviewResponse mapToReviewResponse(Review review) {
        UserSummaryResponse studentSummary = UserSummaryResponse.builder()
                .id(review.getStudent().getId())
                .email(review.getStudent().getEmail())
                .fullName(review.getStudent().getFullName())
                .phone(review.getStudent().getPhone())
                .avatarUrl(review.getStudent().getAvatarUrl())
                .role(review.getStudent().getRole())
                .build();

        return ReviewResponse.builder()
                .id(review.getId())
                .flatId(review.getFlat().getId())
                .student(studentSummary)
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
