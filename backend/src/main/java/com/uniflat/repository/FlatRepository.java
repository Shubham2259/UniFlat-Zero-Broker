package com.uniflat.repository;

import com.uniflat.entity.Flat;
import com.uniflat.entity.FurnishingStatus;
import com.uniflat.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FlatRepository extends JpaRepository<Flat, Long> {

    List<Flat> findByLandlord(User landlord);

    @Query("SELECT f FROM Flat f WHERE f.isAvailable = true " +
            "AND (:keyword IS NULL OR LOWER(f.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "     OR LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "     OR LOWER(f.address) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "     OR LOWER(f.city) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "     OR LOWER(f.nearestUniversity) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:city IS NULL OR LOWER(f.city) LIKE LOWER(CONCAT('%', :city, '%'))) " +
            "AND (:university IS NULL OR LOWER(f.nearestUniversity) LIKE LOWER(CONCAT('%', :university, '%'))) " +
            "AND (:minRent IS NULL OR f.rentAmount >= :minRent) " +
            "AND (:maxRent IS NULL OR f.rentAmount <= :maxRent) " +
            "AND (:bedrooms IS NULL OR f.bedrooms = :bedrooms) " +
            "AND (:furnishingStatus IS NULL OR f.furnishingStatus = :furnishingStatus)")
    Page<Flat> searchFlats(@Param("keyword") String keyword,
                           @Param("city") String city,
                           @Param("university") String university,
                           @Param("minRent") BigDecimal minRent,
                           @Param("maxRent") BigDecimal maxRent,
                           @Param("bedrooms") Integer bedrooms,
                           @Param("furnishingStatus") FurnishingStatus furnishingStatus,
                           Pageable pageable);
}
