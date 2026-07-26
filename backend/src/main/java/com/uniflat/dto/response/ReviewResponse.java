package com.uniflat.dto.response;

import java.time.LocalDateTime;

public class ReviewResponse {
    private Long id;
    private Long flatId;
    private UserSummaryResponse student;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewResponse() {}

    public ReviewResponse(Long id, Long flatId, UserSummaryResponse student, Integer rating, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.flatId = flatId;
        this.student = student;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public static ReviewResponseBuilder builder() {
        return new ReviewResponseBuilder();
    }

    public static class ReviewResponseBuilder {
        private Long id;
        private Long flatId;
        private UserSummaryResponse student;
        private Integer rating;
        private String comment;
        private LocalDateTime createdAt;

        public ReviewResponseBuilder id(Long id) { this.id = id; return this; }
        public ReviewResponseBuilder flatId(Long flatId) { this.flatId = flatId; return this; }
        public ReviewResponseBuilder student(UserSummaryResponse student) { this.student = student; return this; }
        public ReviewResponseBuilder rating(Integer rating) { this.rating = rating; return this; }
        public ReviewResponseBuilder comment(String comment) { this.comment = comment; return this; }
        public ReviewResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ReviewResponse build() {
            return new ReviewResponse(id, flatId, student, rating, comment, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFlatId() { return flatId; }
    public void setFlatId(Long flatId) { this.flatId = flatId; }
    public UserSummaryResponse getStudent() { return student; }
    public void setStudent(UserSummaryResponse student) { this.student = student; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
