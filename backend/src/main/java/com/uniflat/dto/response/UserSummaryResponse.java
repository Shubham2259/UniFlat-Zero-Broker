package com.uniflat.dto.response;

import com.uniflat.entity.Role;

public class UserSummaryResponse {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String avatarUrl;
    private Role role;

    public UserSummaryResponse() {}

    public UserSummaryResponse(Long id, String email, String fullName, String phone, String avatarUrl, Role role) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.role = role;
    }

    public static UserSummaryResponseBuilder builder() {
        return new UserSummaryResponseBuilder();
    }

    public static class UserSummaryResponseBuilder {
        private Long id;
        private String email;
        private String fullName;
        private String phone;
        private String avatarUrl;
        private Role role;

        public UserSummaryResponseBuilder id(Long id) { this.id = id; return this; }
        public UserSummaryResponseBuilder email(String email) { this.email = email; return this; }
        public UserSummaryResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserSummaryResponseBuilder phone(String phone) { this.phone = phone; return this; }
        public UserSummaryResponseBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserSummaryResponseBuilder role(Role role) { this.role = role; return this; }

        public UserSummaryResponse build() {
            return new UserSummaryResponse(id, email, fullName, phone, avatarUrl, role);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
