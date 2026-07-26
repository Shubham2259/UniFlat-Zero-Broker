package com.uniflat.controller;

import com.uniflat.dto.request.InquiryRequest;
import com.uniflat.dto.response.ApiResponse;
import com.uniflat.dto.response.InquiryResponse;
import com.uniflat.entity.InquiryStatus;
import com.uniflat.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<InquiryResponse>> createInquiry(
            @Valid @RequestBody InquiryRequest inquiryRequest,
            Authentication authentication
    ) {
        InquiryResponse inquiry = inquiryService.createInquiry(inquiryRequest, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Inquiry submitted successfully", inquiry), HttpStatus.CREATED);
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<InquiryResponse>>> getStudentInquiries(Authentication authentication) {
        List<InquiryResponse> inquiries = inquiryService.getStudentInquiries(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Student inquiries retrieved successfully", inquiries));
    }

    @GetMapping("/landlord")
    @PreAuthorize("hasAnyRole('LANDLORD', 'ADMIN')")
    public ResponseEntity<ApiResponse<List<InquiryResponse>>> getLandlordInquiries(Authentication authentication) {
        List<InquiryResponse> inquiries = inquiryService.getLandlordInquiries(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Landlord inquiries retrieved successfully", inquiries));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<InquiryResponse>> updateInquiryStatus(
            @PathVariable Long id,
            @RequestParam InquiryStatus status,
            Authentication authentication
    ) {
        InquiryResponse inquiry = inquiryService.updateInquiryStatus(id, status, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Inquiry status updated successfully", inquiry));
    }
}
