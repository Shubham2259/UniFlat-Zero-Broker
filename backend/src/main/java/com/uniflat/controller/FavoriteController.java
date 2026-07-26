package com.uniflat.controller;

import com.uniflat.dto.response.ApiResponse;
import com.uniflat.dto.response.FlatResponse;
import com.uniflat.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/{flatId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Boolean>> toggleFavorite(
            @PathVariable Long flatId,
            Authentication authentication
    ) {
        boolean isFav = favoriteService.toggleFavorite(flatId, authentication.getName());
        String msg = isFav ? "Added to favorites" : "Removed from favorites";
        return ResponseEntity.ok(ApiResponse.success(msg, isFav));
    }

    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<FlatResponse>>> getStudentFavorites(Authentication authentication) {
        List<FlatResponse> favorites = favoriteService.getStudentFavorites(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Favorites retrieved successfully", favorites));
    }

    @GetMapping("/{flatId}/check")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Boolean>> isFavorite(
            @PathVariable Long flatId,
            Authentication authentication
    ) {
        boolean isFav = favoriteService.isFavorite(flatId, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Favorite status checked", isFav));
    }
}
