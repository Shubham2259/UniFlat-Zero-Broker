package com.uniflat.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "flats")
public class Flat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String nearestUniversity;

    private Double distanceToUniversityKm;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal rentAmount;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal depositAmount;

    @Column(nullable = false)
    private Integer bedrooms;

    @Column(nullable = false)
    private Integer bathrooms;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FurnishingStatus furnishingStatus;

    private LocalDate availableFrom;

    private boolean isAvailable = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", nullable = false)
    private User landlord;

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FlatImage> images = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "flat_amenities",
            joinColumns = @JoinColumn(name = "flat_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private Set<Amenity> amenities = new HashSet<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Flat() {}

    public Flat(Long id, String title, String description, String address, String city, String nearestUniversity, Double distanceToUniversityKm, BigDecimal rentAmount, BigDecimal depositAmount, Integer bedrooms, Integer bathrooms, FurnishingStatus furnishingStatus, LocalDate availableFrom, boolean isAvailable, User landlord, List<FlatImage> images, Set<Amenity> amenities, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.address = address;
        this.city = city;
        this.nearestUniversity = nearestUniversity;
        this.distanceToUniversityKm = distanceToUniversityKm;
        this.rentAmount = rentAmount;
        this.depositAmount = depositAmount;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.furnishingStatus = furnishingStatus;
        this.availableFrom = availableFrom;
        this.isAvailable = isAvailable;
        this.landlord = landlord;
        this.images = images != null ? images : new ArrayList<>();
        this.amenities = amenities != null ? amenities : new HashSet<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static FlatBuilder builder() {
        return new FlatBuilder();
    }

    public static class FlatBuilder {
        private Long id;
        private String title;
        private String description;
        private String address;
        private String city;
        private String nearestUniversity;
        private Double distanceToUniversityKm;
        private BigDecimal rentAmount;
        private BigDecimal depositAmount;
        private Integer bedrooms;
        private Integer bathrooms;
        private FurnishingStatus furnishingStatus;
        private LocalDate availableFrom;
        private boolean isAvailable = true;
        private User landlord;
        private List<FlatImage> images = new ArrayList<>();
        private Set<Amenity> amenities = new HashSet<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public FlatBuilder id(Long id) { this.id = id; return this; }
        public FlatBuilder title(String title) { this.title = title; return this; }
        public FlatBuilder description(String description) { this.description = description; return this; }
        public FlatBuilder address(String address) { this.address = address; return this; }
        public FlatBuilder city(String city) { this.city = city; return this; }
        public FlatBuilder nearestUniversity(String nearestUniversity) { this.nearestUniversity = nearestUniversity; return this; }
        public FlatBuilder distanceToUniversityKm(Double distanceToUniversityKm) { this.distanceToUniversityKm = distanceToUniversityKm; return this; }
        public FlatBuilder rentAmount(BigDecimal rentAmount) { this.rentAmount = rentAmount; return this; }
        public FlatBuilder depositAmount(BigDecimal depositAmount) { this.depositAmount = depositAmount; return this; }
        public FlatBuilder bedrooms(Integer bedrooms) { this.bedrooms = bedrooms; return this; }
        public FlatBuilder bathrooms(Integer bathrooms) { this.bathrooms = bathrooms; return this; }
        public FlatBuilder furnishingStatus(FurnishingStatus furnishingStatus) { this.furnishingStatus = furnishingStatus; return this; }
        public FlatBuilder availableFrom(LocalDate availableFrom) { this.availableFrom = availableFrom; return this; }
        public FlatBuilder isAvailable(boolean isAvailable) { this.isAvailable = isAvailable; return this; }
        public FlatBuilder landlord(User landlord) { this.landlord = landlord; return this; }
        public FlatBuilder images(List<FlatImage> images) { this.images = images; return this; }
        public FlatBuilder amenities(Set<Amenity> amenities) { this.amenities = amenities; return this; }
        public FlatBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public FlatBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Flat build() {
            return new Flat(id, title, description, address, city, nearestUniversity, distanceToUniversityKm, rentAmount, depositAmount, bedrooms, bathrooms, furnishingStatus, availableFrom, isAvailable, landlord, images, amenities, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getNearestUniversity() { return nearestUniversity; }
    public void setNearestUniversity(String nearestUniversity) { this.nearestUniversity = nearestUniversity; }
    public Double getDistanceToUniversityKm() { return distanceToUniversityKm; }
    public void setDistanceToUniversityKm(Double distanceToUniversityKm) { this.distanceToUniversityKm = distanceToUniversityKm; }
    public BigDecimal getRentAmount() { return rentAmount; }
    public void setRentAmount(BigDecimal rentAmount) { this.rentAmount = rentAmount; }
    public BigDecimal getDepositAmount() { return depositAmount; }
    public void setDepositAmount(BigDecimal depositAmount) { this.depositAmount = depositAmount; }
    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }
    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }
    public FurnishingStatus getFurnishingStatus() { return furnishingStatus; }
    public void setFurnishingStatus(FurnishingStatus furnishingStatus) { this.furnishingStatus = furnishingStatus; }
    public LocalDate getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(LocalDate availableFrom) { this.availableFrom = availableFrom; }
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { isAvailable = available; }
    public User getLandlord() { return landlord; }
    public void setLandlord(User landlord) { this.landlord = landlord; }
    public List<FlatImage> getImages() { return images; }
    public void setImages(List<FlatImage> images) { this.images = images; }
    public Set<Amenity> getAmenities() { return amenities; }
    public void setAmenities(Set<Amenity> amenities) { this.amenities = amenities; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
