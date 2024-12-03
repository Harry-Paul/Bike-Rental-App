package com.shounoop.bikerentalspring.services.customer;

import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.dto.BikeDto;
import com.shounoop.bikerentalspring.entity.BookABike;
import com.shounoop.bikerentalspring.entity.Bike;
import com.shounoop.bikerentalspring.entity.User;
import com.shounoop.bikerentalspring.enums.BookBikeStatus;
import com.shounoop.bikerentalspring.repository.BookABikeRepository;
import com.shounoop.bikerentalspring.repository.BikeRepository;
import com.shounoop.bikerentalspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final BikeRepository bikeRepository;
    private final UserRepository userRepository;
    private final BookABikeRepository bookABikeRepository;

    @Override
    public List<BikeDto> getAllBikes() {
        return bikeRepository.findAll().stream().map(Bike::getBikeDto).collect(Collectors.toList());
    }

    @Override
    public boolean bookABike(BookABikeDto bookABikeDto) {
        Optional<Bike> optionalBike = bikeRepository.findById(bookABikeDto.getBikeId());
        Optional<User> optionalUser = userRepository.findById(bookABikeDto.getUserId());

        if (optionalBike.isPresent() && optionalUser.isPresent()) {
            Bike existingBike = optionalBike.get();

            BookABike bookABike = new BookABike();
            bookABike.setUser(optionalUser.get());
            bookABike.setBike(existingBike);
            bookABike.setBookBikeStatus(BookBikeStatus.PENDING);

            long diffInMilliSeconds = bookABikeDto.getToDate().getTime() - bookABikeDto.getFromDate().getTime();
            long days = TimeUnit.MICROSECONDS.toDays(diffInMilliSeconds);

            bookABike.setDays(days);
            bookABike.setPrice(days * existingBike.getPrice());

            bookABikeRepository.save(bookABike);
            return true;
        }

        return false;
    }

    @Override
    public BikeDto getBikeById(Long id) {
        Optional<Bike> optionalBike = bikeRepository.findById(id);
        return optionalBike.map(Bike::getBikeDto).orElse(null);
    }

    @Override
    public List<BookABikeDto> getBookingsByUserId(Long userId) {
        System.out.println("qwe");
        return bookABikeRepository.findAllByUserId(userId).stream().map(BookABike::getBookABikeDto).collect(Collectors.toList());
    }
}
