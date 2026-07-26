package com.uniflat.controller;

import com.uniflat.dto.request.FlatRequest;
import com.uniflat.dto.response.ApiResponse;
import com.uniflat.dto.response.FlatResponse;
import com.uniflat.entity.FurnishingStatus;
import com.uniflat.service.FlatService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/flats")
public class FlatController {

    private final FlatService flatService;

    public FlatController(FlatService flatService) {
        this.flatService = flatService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<FlatResponse>>> searchFlats(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String university,
            @RequestParam(required = false) String nearestUniversity,
            @RequestParam(required = false) BigDecimal minRent,
            @RequestParam(required = false) BigDecimal maxRent,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) FurnishingStatus furnishingStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        String activeKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword : search;
        String activeUniv = (university != null && !university.trim().isEmpty()) ? university : nearestUniversity;

        Page<FlatResponse> flats = flatService.searchFlats(activeKeyword, city, activeUniv, minRent, maxRent, bedrooms, furnishingStatus, pageable);
        return ResponseEntity.ok(ApiResponse.success("Flats retrieved successfully", flats));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FlatResponse>> getFlatById(@PathVariable Long id) {
        FlatResponse flat = flatService.getFlatById(id);
        return ResponseEntity.ok(ApiResponse.success("Flat details retrieved successfully", flat));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('LANDLORD', 'ADMIN')")
    public ResponseEntity<ApiResponse<FlatResponse>> createFlat(
            @Valid @RequestBody FlatRequest flatRequest,
            Authentication authentication
    ) {
        FlatResponse createdFlat = flatService.createFlat(flatRequest, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Flat created successfully", createdFlat), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('LANDLORD', 'ADMIN')")
    public ResponseEntity<ApiResponse<FlatResponse>> updateFlat(
            @PathVariable Long id,
            @Valid @RequestBody FlatRequest flatRequest,
            Authentication authentication
    ) {
        FlatResponse updatedFlat = flatService.updateFlat(id, flatRequest, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Flat updated successfully", updatedFlat));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('LANDLORD', 'ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteFlat(
            @PathVariable Long id,
            Authentication authentication
    ) {
        flatService.deleteFlat(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Flat deleted successfully"));
    }

    @GetMapping("/landlord/my-listings")
    @PreAuthorize("hasAnyRole('LANDLORD', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<FlatResponse>>> getMyListings(Authentication authentication) {
        List<FlatResponse> flats = flatService.getLandlordFlats(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("My flat listings retrieved successfully", flats));
    }
}
