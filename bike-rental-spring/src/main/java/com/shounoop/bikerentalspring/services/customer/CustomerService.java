package com.shounoop.bikerentalspring.services.customer;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;

import java.util.List;

public interface CustomerService {
    List<BikeDto> getAllBikes();

    boolean bookABike(BookABikeDto bookABikeDto);

    BikeDto getBikeById(Long id);

    List<BookABikeDto> getBookingsByUserId(Long id);
}
