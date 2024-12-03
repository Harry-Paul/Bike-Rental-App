package com.shounoop.bikerentalspring.services.auth;

import com.shounoop.bikerentalspring.dto.SignupRequest;
import com.shounoop.bikerentalspring.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
