-- UniFlat MySQL Database Schema Script
CREATE DATABASE IF NOT EXISTS uniflat_db;
USE uniflat_db;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    bio TEXT,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: amenities
CREATE TABLE IF NOT EXISTS amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    icon_name VARCHAR(100)
);

-- Table: flats
CREATE TABLE IF NOT EXISTS flats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    nearest_university VARCHAR(255) NOT NULL,
    distance_to_university_km DOUBLE,
    rent_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    furnishing_status VARCHAR(50) NOT NULL,
    available_from DATE,
    is_available BOOLEAN DEFAULT TRUE,
    landlord_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_flat_landlord FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: flat_images
CREATE TABLE IF NOT EXISTS flat_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flat_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_flat_image_flat FOREIGN KEY (flat_id) REFERENCES flats(id) ON DELETE CASCADE
);

-- Table: flat_amenities (Junction Table)
CREATE TABLE IF NOT EXISTS flat_amenities (
    flat_id BIGINT NOT NULL,
    amenity_id BIGINT NOT NULL,
    PRIMARY KEY (flat_id, amenity_id),
    CONSTRAINT fk_fa_flat FOREIGN KEY (flat_id) REFERENCES flats(id) ON DELETE CASCADE,
    CONSTRAINT fk_fa_amenity FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Table: inquiries
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flat_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    message TEXT,
    preferred_move_in_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_inquiry_flat FOREIGN KEY (flat_id) REFERENCES flats(id) ON DELETE CASCADE,
    CONSTRAINT fk_inquiry_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: reviews
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flat_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_flat FOREIGN KEY (flat_id) REFERENCES flats(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: favorites
CREATE TABLE IF NOT EXISTS favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    flat_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_student_flat UNIQUE (student_id, flat_id),
    CONSTRAINT fk_fav_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_flat FOREIGN KEY (flat_id) REFERENCES flats(id) ON DELETE CASCADE
);
