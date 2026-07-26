package com.uniflat.service;

import com.uniflat.dto.request.LoginRequest;
import com.uniflat.dto.request.RegisterRequest;
import com.uniflat.dto.response.AuthResponse;
import com.uniflat.dto.response.UserSummaryResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
    AuthResponse register(RegisterRequest registerRequest);
    UserSummaryResponse getCurrentUserProfile(String email);
}
