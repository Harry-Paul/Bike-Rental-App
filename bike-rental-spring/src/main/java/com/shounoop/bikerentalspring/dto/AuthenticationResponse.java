package com.shounoop.bikerentalspring.dto;

import com.shounoop.bikerentalspring.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private UserRole userRole;
    private Long userId;
}
