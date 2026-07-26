package com.uniflat.dto.response;

import com.uniflat.entity.Amenity;
import com.uniflat.entity.FurnishingStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class FlatResponse {
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
    private boolean isAvailable;
    private UserSummaryResponse landlord;
    private List<String> imageUrls;
    private Set<Amenity> amenities;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FlatResponse() {}

    public FlatResponse(Long id, String title, String description, String address, String city, String nearestUniversity, Double distanceToUniversityKm, BigDecimal rentAmount, BigDecimal depositAmount, Integer bedrooms, Integer bathrooms, FurnishingStatus furnishingStatus, LocalDate availableFrom, boolean isAvailable, UserSummaryResponse landlord, List<String> imageUrls, Set<Amenity> amenities, LocalDateTime createdAt, LocalDateTime updatedAt) {
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
        this.imageUrls = imageUrls;
        this.amenities = amenities;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static FlatResponseBuilder builder() {
        return new FlatResponseBuilder();
    }

    public static class FlatResponseBuilder {
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
        private boolean isAvailable;
        private UserSummaryResponse landlord;
        private List<String> imageUrls;
        private Set<Amenity> amenities;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public FlatResponseBuilder id(Long id) { this.id = id; return this; }
        public FlatResponseBuilder title(String title) { this.title = title; return this; }
        public FlatResponseBuilder description(String description) { this.description = description; return this; }
        public FlatResponseBuilder address(String address) { this.address = address; return this; }
        public FlatResponseBuilder city(String city) { this.city = city; return this; }
        public FlatResponseBuilder nearestUniversity(String nearestUniversity) { this.nearestUniversity = nearestUniversity; return this; }
        public FlatResponseBuilder distanceToUniversityKm(Double distanceToUniversityKm) { this.distanceToUniversityKm = distanceToUniversityKm; return this; }
        public FlatResponseBuilder rentAmount(BigDecimal rentAmount) { this.rentAmount = rentAmount; return this; }
        public FlatResponseBuilder depositAmount(BigDecimal depositAmount) { this.depositAmount = depositAmount; return this; }
        public FlatResponseBuilder bedrooms(Integer bedrooms) { this.bedrooms = bedrooms; return this; }
        public FlatResponseBuilder bathrooms(Integer bathrooms) { this.bathrooms = bathrooms; return this; }
        public FlatResponseBuilder furnishingStatus(FurnishingStatus furnishingStatus) { this.furnishingStatus = furnishingStatus; return this; }
        public FlatResponseBuilder availableFrom(LocalDate availableFrom) { this.availableFrom = availableFrom; return this; }
        public FlatResponseBuilder isAvailable(boolean isAvailable) { this.isAvailable = isAvailable; return this; }
        public FlatResponseBuilder landlord(UserSummaryResponse landlord) { this.landlord = landlord; return this; }
        public FlatResponseBuilder imageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; return this; }
        public FlatResponseBuilder amenities(Set<Amenity> amenities) { this.amenities = amenities; return this; }
        public FlatResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public FlatResponseBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public FlatResponse build() {
            return new FlatResponse(id, title, description, address, city, nearestUniversity, distanceToUniversityKm, rentAmount, depositAmount, bedrooms, bathrooms, furnishingStatus, availableFrom, isAvailable, landlord, imageUrls, amenities, createdAt, updatedAt);
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
    public UserSummaryResponse getLandlord() { return landlord; }
    public void setLandlord(UserSummaryResponse landlord) { this.landlord = landlord; }
    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
    public Set<Amenity> getAmenities() { return amenities; }
    public void setAmenities(Set<Amenity> amenities) { this.amenities = amenities; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
