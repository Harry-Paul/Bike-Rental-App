package com.shounoop.bikerentalspring.dto;

import lombok.Data;

@Data
public class SearchBikeDto {
    private String brand;
    private String type;
    private String transmission;
    private String color;
}
