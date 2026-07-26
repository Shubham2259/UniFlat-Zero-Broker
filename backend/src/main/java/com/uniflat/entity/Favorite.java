package com.uniflat.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorites", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"student_id", "flat_id"})
})
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flat_id", nullable = false)
    private Flat flat;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Favorite() {}

    public Favorite(Long id, User student, Flat flat, LocalDateTime createdAt) {
        this.id = id;
        this.student = student;
        this.flat = flat;
        this.createdAt = createdAt;
    }

    public static FavoriteBuilder builder() {
        return new FavoriteBuilder();
    }

    public static class FavoriteBuilder {
        private Long id;
        private User student;
        private Flat flat;
        private LocalDateTime createdAt;

        public FavoriteBuilder id(Long id) { this.id = id; return this; }
        public FavoriteBuilder student(User student) { this.student = student; return this; }
        public FavoriteBuilder flat(Flat flat) { this.flat = flat; return this; }
        public FavoriteBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Favorite build() {
            return new Favorite(id, student, flat, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public Flat getFlat() { return flat; }
    public void setFlat(Flat flat) { this.flat = flat; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
