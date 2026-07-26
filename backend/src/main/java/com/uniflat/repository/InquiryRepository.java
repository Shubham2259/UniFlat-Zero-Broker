package com.uniflat.repository;

import com.uniflat.entity.Flat;
import com.uniflat.entity.Inquiry;
import com.uniflat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByStudentOrderByCreatedAtDesc(User student);
    List<Inquiry> findByFlatInOrderByCreatedAtDesc(List<Flat> flats);
    Boolean existsByStudentAndFlat(User student, Flat flat);
}
