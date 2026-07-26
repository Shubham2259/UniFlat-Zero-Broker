package com.uniflat.repository;

import com.uniflat.entity.Favorite;
import com.uniflat.entity.Flat;
import com.uniflat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByStudentOrderByCreatedAtDesc(User student);
    Optional<Favorite> findByStudentAndFlat(User student, Flat flat);
    Boolean existsByStudentAndFlat(User student, Flat flat);
    void deleteByStudentAndFlat(User student, Flat flat);
}
