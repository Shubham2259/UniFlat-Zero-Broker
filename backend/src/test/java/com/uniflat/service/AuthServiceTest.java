package com.uniflat.service;

import com.uniflat.dto.request.LoginRequest;
import com.uniflat.dto.request.RegisterRequest;
import com.uniflat.dto.response.AuthResponse;
import com.uniflat.entity.Role;
import com.uniflat.entity.User;
import com.uniflat.repository.UserRepository;
import com.uniflat.security.JwtTokenProvider;
import com.uniflat.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .id(1L)
                .email("student@uniflat.com")
                .password("encoded_secret_123")
                .fullName("Alex Student")
                .role(Role.ROLE_STUDENT)
                .build();
    }

    @Test
    void testLogin_Success() {
        LoginRequest loginRequest = new LoginRequest("student@uniflat.com", "password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(tokenProvider.generateToken(authentication)).thenReturn("mock.jwt.token");
        when(userRepository.findByEmail("student@uniflat.com")).thenReturn(Optional.of(sampleUser));

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getAccessToken());
        assertEquals("Bearer", response.getTokenType());
        assertEquals("student@uniflat.com", response.getUser().getEmail());
        assertEquals(Role.ROLE_STUDENT, response.getUser().getRole());
    }

    @Test
    void testRegister_Success() {
        RegisterRequest registerRequest = new RegisterRequest("Alex Student", "student@uniflat.com", "password123", "+1234567890", Role.ROLE_STUDENT);

        when(userRepository.existsByEmail("student@uniflat.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encoded_secret_123");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(tokenProvider.generateToken(authentication)).thenReturn("mock.jwt.token");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("mock.jwt.token", response.getAccessToken());
        assertEquals("student@uniflat.com", response.getUser().getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
