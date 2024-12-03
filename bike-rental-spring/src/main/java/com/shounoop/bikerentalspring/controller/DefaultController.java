package com.shounoop.bikerentalspring.controller;

import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.SearchBikeDto;
import com.shounoop.bikerentalspring.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.SearchBikeDto;
import com.shounoop.bikerentalspring.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/default")
@RequiredArgsConstructor
public class DefaultController {
    private final CustomerService customerService;
    private final AdminService adminService;

    @GetMapping("/bikes")
    public ResponseEntity<List<BikeDto>> getAllBikes() {
        System.out.println("abc");
        return ResponseEntity.ok(customerService.getAllBikes());
    }

    @PostMapping("/bike/search")
    public ResponseEntity<?> searchBike(@RequestBody SearchBikeDto searchBikeDto) {
        return ResponseEntity.ok(adminService.searchBike(searchBikeDto));
    }
}
