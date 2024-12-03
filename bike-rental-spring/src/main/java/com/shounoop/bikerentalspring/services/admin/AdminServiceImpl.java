package com.shounoop.bikerentalspring.services.admin;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.dto.BikeDtoListDto;
import com.shounoop.bikerentalspring.dto.SearchBikeDto;
import com.shounoop.bikerentalspring.entity.BookABike;
import com.shounoop.bikerentalspring.entity.Bike;
import com.shounoop.bikerentalspring.enums.BookBikeStatus;
import com.shounoop.bikerentalspring.repository.BookABikeRepository;
import com.shounoop.bikerentalspring.repository.BikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final BikeRepository bikeRepository;
    private final BookABikeRepository bookABikeRepository;

    @Override
    public boolean postBike(BikeDto bikeDto) throws IOException {
        boolean isSuccessful = false;

        try {
            Bike bike = new Bike();
            bike.setName(bikeDto.getName());
            bike.setBrand(bikeDto.getBrand());
            bike.setColor(bikeDto.getColor());
            bike.setDescription(bikeDto.getDescription());
            bike.setPrice(bikeDto.getPrice());
            bike.setTransmission(bikeDto.getTransmission());
            bike.setType(bikeDto.getType());
            bike.setYear(bikeDto.getYear());
            bike.setImage(bikeDto.getImage().getBytes());

            bikeRepository.save(bike);

            isSuccessful = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return isSuccessful;
    }

    @Override
    public List<BikeDto> getAllBikes() {
        return bikeRepository.findAll().stream().map(Bike::getBikeDto).collect(Collectors.toList());
    }

    @Override
    public void deleteBike(Long id) {
        bikeRepository.deleteById(id);
    }

    @Override
    public BikeDto getBikeById(Long id) {
        return bikeRepository.findById(id).map(Bike::getBikeDto).orElse(null); // map() is a method that applies a given function to each element of a stream
    }

    @Override
    public boolean updateBike(Long id, BikeDto bikeDto) throws IOException {
        Optional<Bike> optionalBike = bikeRepository.findById(id);

        if (optionalBike.isPresent()) {
            Bike existingBike = optionalBike.get();

            if (bikeDto.getImage() != null) {
                existingBike.setImage(bikeDto.getImage().getBytes());
            }

            existingBike.setPrice(bikeDto.getPrice());
            existingBike.setYear(bikeDto.getYear());
            existingBike.setType(bikeDto.getType());
            existingBike.setDescription(bikeDto.getDescription());
            existingBike.setTransmission(bikeDto.getTransmission());
            existingBike.setColor(bikeDto.getColor());
            existingBike.setName(bikeDto.getName());
            existingBike.setBrand(bikeDto.getBrand());

            bikeRepository.save(existingBike);

            return true;
        }

        return false;
    }

    @Override
    public List<BookABikeDto> getBookings() {
        return bookABikeRepository.findAll().stream().map(BookABike::getBookABikeDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long id, String status) {
        Optional<BookABike> optionalBookABike = bookABikeRepository.findById(id);

        if (optionalBookABike.isPresent()) {
            BookABike bookABike = optionalBookABike.get();

            if (Objects.equals(status, "Approve")) {
                bookABike.setBookBikeStatus(BookBikeStatus.APPROVED);
            } else {
                bookABike.setBookBikeStatus(BookBikeStatus.REJECTED);
            }

            bookABikeRepository.save(bookABike);

            return true;
        }

        return false;
    }

    @Override
    public BikeDtoListDto searchBike(SearchBikeDto searchBikeDto) {
        Bike bike = new Bike();
        bike.setBrand(searchBikeDto.getBrand());
        bike.setType(searchBikeDto.getType());
        bike.setTransmission(searchBikeDto.getTransmission());
        bike.setColor(searchBikeDto.getColor());

        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll().withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        Example<Bike> bikeExample = Example.of(bike, exampleMatcher);

        List<Bike> bikeList = bikeRepository.findAll(bikeExample);

        BikeDtoListDto bikeDtoListDto = new BikeDtoListDto();
        bikeDtoListDto.setBikeDtoList(bikeList.stream().map(Bike::getBikeDto).collect(Collectors.toList()));

        return bikeDtoListDto;
    }
}
