package com.uniflat.dto.response;

import com.uniflat.entity.InquiryStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class InquiryResponse {
    private Long id;
    private FlatResponse flat;
    private UserSummaryResponse student;
    private String message;
    private LocalDate preferredMoveInDate;
    private InquiryStatus status;
    private LocalDateTime createdAt;

    public InquiryResponse() {}

    public InquiryResponse(Long id, FlatResponse flat, UserSummaryResponse student, String message, LocalDate preferredMoveInDate, InquiryStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.flat = flat;
        this.student = student;
        this.message = message;
        this.preferredMoveInDate = preferredMoveInDate;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static InquiryResponseBuilder builder() {
        return new InquiryResponseBuilder();
    }

    public static class InquiryResponseBuilder {
        private Long id;
        private FlatResponse flat;
        private UserSummaryResponse student;
        private String message;
        private LocalDate preferredMoveInDate;
        private InquiryStatus status;
        private LocalDateTime createdAt;

        public InquiryResponseBuilder id(Long id) { this.id = id; return this; }
        public InquiryResponseBuilder flat(FlatResponse flat) { this.flat = flat; return this; }
        public InquiryResponseBuilder student(UserSummaryResponse student) { this.student = student; return this; }
        public InquiryResponseBuilder message(String message) { this.message = message; return this; }
        public InquiryResponseBuilder preferredMoveInDate(LocalDate preferredMoveInDate) { this.preferredMoveInDate = preferredMoveInDate; return this; }
        public InquiryResponseBuilder status(InquiryStatus status) { this.status = status; return this; }
        public InquiryResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public InquiryResponse build() {
            return new InquiryResponse(id, flat, student, message, preferredMoveInDate, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public FlatResponse getFlat() { return flat; }
    public void setFlat(FlatResponse flat) { this.flat = flat; }
    public UserSummaryResponse getStudent() { return student; }
    public void setStudent(UserSummaryResponse student) { this.student = student; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDate getPreferredMoveInDate() { return preferredMoveInDate; }
    public void setPreferredMoveInDate(LocalDate preferredMoveInDate) { this.preferredMoveInDate = preferredMoveInDate; }
    public InquiryStatus getStatus() { return status; }
    public void setStatus(InquiryStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
