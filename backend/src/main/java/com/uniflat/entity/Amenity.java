package com.uniflat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String iconName;

    public Amenity() {}

    public Amenity(Long id, String name, String iconName) {
        this.id = id;
        this.name = name;
        this.iconName = iconName;
    }

    public static AmenityBuilder builder() {
        return new AmenityBuilder();
    }

    public static class AmenityBuilder {
        private Long id;
        private String name;
        private String iconName;

        public AmenityBuilder id(Long id) { this.id = id; return this; }
        public AmenityBuilder name(String name) { this.name = name; return this; }
        public AmenityBuilder iconName(String iconName) { this.iconName = iconName; return this; }

        public Amenity build() {
            return new Amenity(id, name, iconName);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
}
