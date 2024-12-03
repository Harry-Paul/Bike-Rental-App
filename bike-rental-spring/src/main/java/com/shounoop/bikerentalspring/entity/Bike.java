package com.shounoop.bikerentalspring.entity;

import com.shounoop.bikerentalspring.dto.BikeDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "bikes")
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    private String color;
    private String name;
    private String type;
    private String transmission;
    private String description;
    private Long price;
    private Integer year;

    @Column(columnDefinition = "longblob")
    private byte[] image;

    public BikeDto getBikeDto() {
        BikeDto bikeDto = new BikeDto();
        bikeDto.setId(id);
        bikeDto.setName(name);
        bikeDto.setBrand(brand);
        bikeDto.setColor(color);
        bikeDto.setPrice(price);
        bikeDto.setDescription(description);
        bikeDto.setType(type);
        bikeDto.setTransmission(transmission);
        bikeDto.setYear(year);
        bikeDto.setReturnedImage(image);
        return bikeDto;
    }
}
