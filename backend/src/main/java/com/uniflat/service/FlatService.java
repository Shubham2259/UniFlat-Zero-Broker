package com.uniflat.service;

import com.uniflat.dto.request.FlatRequest;
import com.uniflat.dto.response.FlatResponse;
import com.uniflat.entity.FurnishingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface FlatService {
    FlatResponse createFlat(FlatRequest flatRequest, String landlordEmail);
    FlatResponse updateFlat(Long flatId, FlatRequest flatRequest, String userEmail);
    void deleteFlat(Long flatId, String userEmail);
    FlatResponse getFlatById(Long flatId);
    Page<FlatResponse> searchFlats(String keyword, String city, String university, BigDecimal minRent, BigDecimal maxRent,
                                  Integer bedrooms, FurnishingStatus furnishingStatus, Pageable pageable);
    List<FlatResponse> getLandlordFlats(String landlordEmail);
}
