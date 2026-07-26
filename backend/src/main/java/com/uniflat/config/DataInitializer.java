package com.uniflat.config;

import com.uniflat.entity.*;
import com.uniflat.repository.AmenityRepository;
import com.uniflat.repository.FlatImageRepository;
import com.uniflat.repository.FlatRepository;
import com.uniflat.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AmenityRepository amenityRepository;
    private final UserRepository userRepository;
    private final FlatRepository flatRepository;
    private final FlatImageRepository flatImageRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(AmenityRepository amenityRepository,
                           UserRepository userRepository,
                           FlatRepository flatRepository,
                           FlatImageRepository flatImageRepository,
                           PasswordEncoder passwordEncoder) {
        this.amenityRepository = amenityRepository;
        this.userRepository = userRepository;
        this.flatRepository = flatRepository;
        this.flatImageRepository = flatImageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Default Amenities
        if (amenityRepository.count() == 0) {
            List<Amenity> defaultAmenities = List.of(
                    Amenity.builder().name("High Speed Wi-Fi").iconName("wifi").build(),
                    Amenity.builder().name("Air Conditioning").iconName("snowflake").build(),
                    Amenity.builder().name("Washing Machine").iconName("shirt").build(),
                    Amenity.builder().name("Power Backup / Generator").iconName("zap").build(),
                    Amenity.builder().name("24/7 Security & CCTV").iconName("shield-check").build(),
                    Amenity.builder().name("Furnished Kitchen & Microwave").iconName("utensils").build(),
                    Amenity.builder().name("Gym & Fitness Center").iconName("dumbbell").build(),
                    Amenity.builder().name("Vehicle Parking").iconName("car").build(),
                    Amenity.builder().name("Water Purifier (RO)").iconName("droplet").build(),
                    Amenity.builder().name("Study Desk & Chair").iconName("book-open").build()
            );
            amenityRepository.saveAll(defaultAmenities);
        }

        // 2. Seed Sample Flat Listings if Less Than 5
        if (flatRepository.count() < 5) {
            List<Amenity> allAmenities = amenityRepository.findAll();
            Set<Amenity> topAmenities = new HashSet<>(allAmenities.subList(0, Math.min(6, allAmenities.size())));

            // Seed Landlords
            User landlord1 = getOrCreateUser("Rajesh Sharma", "rajesh.landlord@uniflat.com", "+91 98301 12345", Role.ROLE_LANDLORD);
            User landlord2 = getOrCreateUser("Sunita Banerjee", "sunita.landlord@uniflat.com", "+91 98312 67890", Role.ROLE_LANDLORD);
            User landlord3 = getOrCreateUser("Amitabh Das", "amitabh.landlord@uniflat.com", "+91 98365 43210", Role.ROLE_LANDLORD);
            User landlord4 = getOrCreateUser("Priya Mukherjee", "priya.landlord@uniflat.com", "+91 98741 85296", Role.ROLE_LANDLORD);
            User landlord5 = getOrCreateUser("Sanjay Roy", "sanjay.landlord@uniflat.com", "+91 98000 11223", Role.ROLE_LANDLORD);

            // Sample Flat 1 - Techno Main Salt Lake
            createSampleFlat(
                    "Modern 2BHK Student Apartment Near Techno Main Salt Lake",
                    "Spacious, fully furnished 2BHK flat situated 500 meters from Techno Main Salt Lake campus. Features high-speed fiber Wi-Fi, modern kitchen, 24/7 power backup, and quiet study room for engineering students.",
                    "Block EP & GP, Sector V, Salt Lake",
                    "Kolkata",
                    "Techno Main Salt Lake",
                    0.5,
                    new BigDecimal("12000.00"),
                    new BigDecimal("24000.00"),
                    2, 2,
                    FurnishingStatus.FURNISHED,
                    landlord1,
                    topAmenities,
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            );

            // Sample Flat 2 - Jadavpur University
            createSampleFlat(
                    "Cozy 1BHK Flat Close to Jadavpur University Campus",
                    "Ideal flat for Jadavpur University students. Located in a safe residential neighborhood, 10-minute walk to JU Gate 3. Fully air-conditioned with attached balcony, RO water purifier, and high-speed Wi-Fi.",
                    "88 Raja S.C. Mallick Road, Jadavpur",
                    "Kolkata",
                    "Jadavpur University",
                    0.8,
                    new BigDecimal("9500.00"),
                    new BigDecimal("19000.00"),
                    1, 1,
                    FurnishingStatus.FURNISHED,
                    landlord2,
                    topAmenities,
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            );

            // Sample Flat 3 - Heritage Institute of Technology
            createSampleFlat(
                    "Luxury 3BHK Shared Flat Near Heritage Institute of Technology",
                    "Large 3BHK flat near Heritage campus, Anandapur. Perfect for group student sharing. Fully furnished with study desks, microwave, washing machine, covered parking, and 24/7 security guard.",
                    "Chowbaga Road, Anandapur, Ruby Crossing",
                    "Kolkata",
                    "Heritage Institute of Technology",
                    1.2,
                    new BigDecimal("18000.00"),
                    new BigDecimal("36000.00"),
                    3, 2,
                    FurnishingStatus.SEMI_FURNISHED,
                    landlord3,
                    topAmenities,
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            );

            // Sample Flat 4 - MAKAUT
            createSampleFlat(
                    "Budget Studio Apartment Near MAKAUT Haringhata Campus",
                    "Compact, modern studio flat right near MAKAUT campus gates. Features peaceful environment, power backup, study desk, water purifier, and high-speed Wi-Fi included in rent.",
                    "NH-34 Bypass, Haringhata",
                    "Kolkata",
                    "MAKAUT",
                    0.3,
                    new BigDecimal("7000.00"),
                    new BigDecimal("14000.00"),
                    1, 1,
                    FurnishingStatus.FURNISHED,
                    landlord4,
                    topAmenities,
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80"
            );

            // Sample Flat 5 - University of Calcutta
            createSampleFlat(
                    "Heritage 2BHK Apartment Near University of Calcutta (College Street)",
                    "Classic high-ceiling 2BHK flat situated 5 minutes walk from CU College Street campus. Prime location surrounded by book shops, metro access, clean water supply, and spacious rooms.",
                    "87 College Street, Bowbazar",
                    "Kolkata",
                    "University of Calcutta",
                    0.4,
                    new BigDecimal("11000.00"),
                    new BigDecimal("22000.00"),
                    2, 1,
                    FurnishingStatus.SEMI_FURNISHED,
                    landlord5,
                    topAmenities,
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            );
        }
    }

    private User getOrCreateUser(String fullName, String email, String phone, Role role) {
        return userRepository.findByEmail(email).orElseGet(() ->
                userRepository.save(User.builder()
                        .fullName(fullName)
                        .email(email)
                        .phone(phone)
                        .password(passwordEncoder.encode("Password@123"))
                        .role(role)
                        .build())
        );
    }

    private void createSampleFlat(String title, String description, String address, String city,
                                  String nearestUniversity, double distanceKm, BigDecimal rent, BigDecimal deposit,
                                  int bedrooms, int bathrooms, FurnishingStatus status, User landlord,
                                  Set<Amenity> amenities, String imageUrl) {
        Flat flat = Flat.builder()
                .title(title)
                .description(description)
                .address(address)
                .city(city)
                .nearestUniversity(nearestUniversity)
                .distanceToUniversityKm(distanceKm)
                .rentAmount(rent)
                .depositAmount(deposit)
                .bedrooms(bedrooms)
                .bathrooms(bathrooms)
                .furnishingStatus(status)
                .availableFrom(LocalDate.now().plusDays(5))
                .isAvailable(true)
                .landlord(landlord)
                .amenities(amenities)
                .build();

        Flat savedFlat = flatRepository.save(flat);

        FlatImage image = FlatImage.builder()
                .imageUrl(imageUrl)
                .isPrimary(true)
                .flat(savedFlat)
                .build();

        flatImageRepository.save(image);
        savedFlat.setImages(List.of(image));
    }
}
