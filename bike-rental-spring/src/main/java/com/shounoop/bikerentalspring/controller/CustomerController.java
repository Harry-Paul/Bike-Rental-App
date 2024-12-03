package com.shounoop.bikerentalspring.controller;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class  CustomerController {
    private final CustomerService customerService;

    @GetMapping("/bikes")
    public ResponseEntity<List<BikeDto>> getAllBikes() {
        return ResponseEntity.ok(customerService.getAllBikes());
    }

    @PostMapping("/bike/book")
    public ResponseEntity<Void> bookABike(@RequestBody BookABikeDto bookABikeDto) {
        boolean isSuccessful = customerService.bookABike(bookABikeDto);

        if (isSuccessful) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/bike/{bikeId}")
    public ResponseEntity<BikeDto> getBikeById(@PathVariable Long bikeId) {
        BikeDto bikeDto = customerService.getBikeById(bikeId);

        if (bikeDto != null) {
            return ResponseEntity.ok(bikeDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/bike/bookings/{userId}")
    public ResponseEntity<List<BookABikeDto>> getBookingsByUserId(@PathVariable Long userId) {
        System.out.println("qwe");
        return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }
}
