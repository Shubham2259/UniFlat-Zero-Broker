package com.uniflat.dto.request;

import com.uniflat.entity.FurnishingStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class FlatRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Nearest university is required")
    private String nearestUniversity;

    private Double distanceToUniversityKm;

    @NotNull(message = "Rent amount is required")
    @Min(value = 0, message = "Rent amount must be non-negative")
    private BigDecimal rentAmount;

    @NotNull(message = "Deposit amount is required")
    @Min(value = 0, message = "Deposit amount must be non-negative")
    private BigDecimal depositAmount;

    @NotNull(message = "Bedrooms count is required")
    @Min(value = 1, message = "At least 1 bedroom required")
    private Integer bedrooms;

    @NotNull(message = "Bathrooms count is required")
    @Min(value = 1, message = "At least 1 bathroom required")
    private Integer bathrooms;

    @NotNull(message = "Furnishing status is required")
    private FurnishingStatus furnishingStatus;

    private LocalDate availableFrom;

    private List<String> imageUrls;

    private List<Long> amenityIds;

    public FlatRequest() {}

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
    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
    public List<Long> getAmenityIds() { return amenityIds; }
    public void setAmenityIds(List<Long> amenityIds) { this.amenityIds = amenityIds; }
}
