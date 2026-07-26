package com.uniflat.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class InquiryRequest {

    @NotNull(message = "Flat ID is required")
    private Long flatId;

    private String message;

    private LocalDate preferredMoveInDate;

    public InquiryRequest() {}

    public InquiryRequest(Long flatId, String message, LocalDate preferredMoveInDate) {
        this.flatId = flatId;
        this.message = message;
        this.preferredMoveInDate = preferredMoveInDate;
    }

    public Long getFlatId() { return flatId; }
    public void setFlatId(Long flatId) { this.flatId = flatId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDate getPreferredMoveInDate() { return preferredMoveInDate; }
    public void setPreferredMoveInDate(LocalDate preferredMoveInDate) { this.preferredMoveInDate = preferredMoveInDate; }
}
