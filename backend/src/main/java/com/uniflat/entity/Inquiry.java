package com.uniflat.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flat_id", nullable = false)
    private Flat flat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDate preferredMoveInDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InquiryStatus status = InquiryStatus.PENDING;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Inquiry() {}

    public Inquiry(Long id, Flat flat, User student, String message, LocalDate preferredMoveInDate, InquiryStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.flat = flat;
        this.student = student;
        this.message = message;
        this.preferredMoveInDate = preferredMoveInDate;
        this.status = status != null ? status : InquiryStatus.PENDING;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static InquiryBuilder builder() {
        return new InquiryBuilder();
    }

    public static class InquiryBuilder {
        private Long id;
        private Flat flat;
        private User student;
        private String message;
        private LocalDate preferredMoveInDate;
        private InquiryStatus status = InquiryStatus.PENDING;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public InquiryBuilder id(Long id) { this.id = id; return this; }
        public InquiryBuilder flat(Flat flat) { this.flat = flat; return this; }
        public InquiryBuilder student(User student) { this.student = student; return this; }
        public InquiryBuilder message(String message) { this.message = message; return this; }
        public InquiryBuilder preferredMoveInDate(LocalDate preferredMoveInDate) { this.preferredMoveInDate = preferredMoveInDate; return this; }
        public InquiryBuilder status(InquiryStatus status) { this.status = status; return this; }
        public InquiryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public InquiryBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Inquiry build() {
            return new Inquiry(id, flat, student, message, preferredMoveInDate, status, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Flat getFlat() { return flat; }
    public void setFlat(Flat flat) { this.flat = flat; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDate getPreferredMoveInDate() { return preferredMoveInDate; }
    public void setPreferredMoveInDate(LocalDate preferredMoveInDate) { this.preferredMoveInDate = preferredMoveInDate; }
    public InquiryStatus getStatus() { return status; }
    public void setStatus(InquiryStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
