package com.shounoop.bikerentalspring.controller;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.SearchBikeDto;
import com.shounoop.bikerentalspring.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    // ? is a wildbiked that represents an unknown type
    @PostMapping("/bike")
    public ResponseEntity<?> postBike(@ModelAttribute BikeDto bikeDto) throws IOException {
        boolean isSuccessful = adminService.postBike(bikeDto);

        if (isSuccessful) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/bikes")
    public ResponseEntity<?> getAllBikes() {
        return ResponseEntity.ok(adminService.getAllBikes());
    }

    @DeleteMapping("/bike/{id}")
    public ResponseEntity<Void> deleteBike(@PathVariable Long id) {
        adminService.deleteBike(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/bike/{id}")
    public ResponseEntity<?> getBikeById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getBikeById(id));
    }

    @PutMapping("/bike/{id}")
    public ResponseEntity<Void> updateBike(@PathVariable Long id, @ModelAttribute BikeDto bikeDto) throws IOException {
        try {
            boolean isSuccessful = adminService.updateBike(id, bikeDto);

            if (isSuccessful) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/bike/bookings")
    private ResponseEntity<List<BookABikeDto>> getBookings() {
        return ResponseEntity.ok(adminService.getBookings());
    }

    @GetMapping("/bike/booking/{bookingId}/{status}")
    private ResponseEntity<Void> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status) {
        boolean isSuccessful = adminService.changeBookingStatus(bookingId, status);

        if (isSuccessful) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/bike/search")
    public ResponseEntity<?> searchBike(@RequestBody SearchBikeDto searchBikeDto) {
        return ResponseEntity.ok(adminService.searchBike(searchBikeDto));
    }
}
