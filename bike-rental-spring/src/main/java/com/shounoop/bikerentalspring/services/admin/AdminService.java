package com.shounoop.bikerentalspring.services.admin;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.BikeDtoListDto;
import com.shounoop.bikerentalspring.dto.SearchBikeDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postBike(BikeDto bikeDto) throws IOException;

    List<BikeDto> getAllBikes();

    void deleteBike(Long id);

    BikeDto getBikeById(Long id);

    boolean updateBike(Long id, BikeDto bikeDto) throws IOException;

    List<BookABikeDto> getBookings();


    boolean changeBookingStatus(Long id, String status);

    BikeDtoListDto searchBike(SearchBikeDto searchBikeDto);
}
