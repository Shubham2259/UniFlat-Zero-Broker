package com.uniflat.service;

import com.uniflat.dto.request.ReviewRequest;
import com.uniflat.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    ReviewResponse addReview(Long flatId, ReviewRequest reviewRequest, String studentEmail);
    List<ReviewResponse> getReviewsForFlat(Long flatId);
}
