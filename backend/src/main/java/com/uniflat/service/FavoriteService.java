package com.uniflat.service;

import com.uniflat.dto.response.FlatResponse;

import java.util.List;

public interface FavoriteService {
    boolean toggleFavorite(Long flatId, String studentEmail);
    List<FlatResponse> getStudentFavorites(String studentEmail);
    boolean isFavorite(Long flatId, String studentEmail);
}
