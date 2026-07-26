package com.uniflat.controller;

import com.uniflat.dto.request.ReviewRequest;
import com.uniflat.dto.response.ApiResponse;
import com.uniflat.dto.response.ReviewResponse;
import com.uniflat.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/flats/{flatId}/reviews")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(
            @PathVariable Long flatId,
            @Valid @RequestBody ReviewRequest reviewRequest,
            Authentication authentication
    ) {
        ReviewResponse review = reviewService.addReview(flatId, reviewRequest, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Review submitted successfully", review), HttpStatus.CREATED);
    }

    @GetMapping("/flats/{flatId}/reviews")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewsForFlat(@PathVariable Long flatId) {
        List<ReviewResponse> reviews = reviewService.getReviewsForFlat(flatId);
        return ResponseEntity.ok(ApiResponse.success("Reviews retrieved successfully", reviews));
    }
}
