package com.uniflat.service.impl;

import com.uniflat.dto.response.FlatResponse;
import com.uniflat.entity.Favorite;
import com.uniflat.entity.Flat;
import com.uniflat.entity.User;
import com.uniflat.exception.ResourceNotFoundException;
import com.uniflat.repository.FavoriteRepository;
import com.uniflat.repository.FlatRepository;
import com.uniflat.repository.UserRepository;
import com.uniflat.service.FavoriteService;
import com.uniflat.service.FlatService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final FlatRepository flatRepository;
    private final FlatService flatService;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository,
                               UserRepository userRepository,
                               FlatRepository flatRepository,
                               FlatService flatService) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.flatRepository = flatRepository;
        this.flatService = flatService;
    }

    @Override
    @Transactional
    public boolean toggleFavorite(Long flatId, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));

        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));

        Optional<Favorite> existing = favoriteRepository.findByStudentAndFlat(student, flat);
        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
            return false;
        } else {
            Favorite favorite = Favorite.builder()
                    .student(student)
                    .flat(flat)
                    .build();
            favoriteRepository.save(favorite);
            return true;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<FlatResponse> getStudentFavorites(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));
        List<Favorite> favorites = favoriteRepository.findByStudentOrderByCreatedAtDesc(student);

        return favorites.stream()
                .map(fav -> flatService.getFlatById(fav.getFlat().getId()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isFavorite(Long flatId, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", studentEmail));
        Flat flat = flatRepository.findById(flatId)
                .orElseThrow(() -> new ResourceNotFoundException("Flat", "id", flatId));
        return favoriteRepository.existsByStudentAndFlat(student, flat);
    }
}
