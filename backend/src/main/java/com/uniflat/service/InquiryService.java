package com.uniflat.service;

import com.uniflat.dto.request.InquiryRequest;
import com.uniflat.dto.response.InquiryResponse;
import com.uniflat.entity.InquiryStatus;

import java.util.List;

public interface InquiryService {
    InquiryResponse createInquiry(InquiryRequest inquiryRequest, String studentEmail);
    List<InquiryResponse> getStudentInquiries(String studentEmail);
    List<InquiryResponse> getLandlordInquiries(String landlordEmail);
    InquiryResponse updateInquiryStatus(Long inquiryId, InquiryStatus status, String userEmail);
}
