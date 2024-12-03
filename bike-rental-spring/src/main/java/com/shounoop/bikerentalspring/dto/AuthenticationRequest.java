package com.shounoop.bikerentalspring.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
