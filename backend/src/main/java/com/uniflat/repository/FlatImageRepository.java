package com.uniflat.repository;

import com.uniflat.entity.Flat;
import com.uniflat.entity.FlatImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlatImageRepository extends JpaRepository<FlatImage, Long> {
    List<FlatImage> findByFlat(Flat flat);
}
