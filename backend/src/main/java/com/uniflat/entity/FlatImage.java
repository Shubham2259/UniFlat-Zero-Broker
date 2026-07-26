package com.uniflat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "flat_images")
public class FlatImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    private boolean isPrimary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flat_id", nullable = false)
    @JsonIgnore
    private Flat flat;

    public FlatImage() {}

    public FlatImage(Long id, String imageUrl, boolean isPrimary, Flat flat) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.isPrimary = isPrimary;
        this.flat = flat;
    }

    public static FlatImageBuilder builder() {
        return new FlatImageBuilder();
    }

    public static class FlatImageBuilder {
        private Long id;
        private String imageUrl;
        private boolean isPrimary;
        private Flat flat;

        public FlatImageBuilder id(Long id) { this.id = id; return this; }
        public FlatImageBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public FlatImageBuilder isPrimary(boolean isPrimary) { this.isPrimary = isPrimary; return this; }
        public FlatImageBuilder flat(Flat flat) { this.flat = flat; return this; }

        public FlatImage build() {
            return new FlatImage(id, imageUrl, isPrimary, flat);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public boolean isPrimary() { return isPrimary; }
    public void setPrimary(boolean isPrimary) { this.isPrimary = isPrimary; }
    public Flat getFlat() { return flat; }
    public void setFlat(Flat flat) { this.flat = flat; }
}
