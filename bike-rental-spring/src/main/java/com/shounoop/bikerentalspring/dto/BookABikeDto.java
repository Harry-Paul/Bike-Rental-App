package com.shounoop.bikerentalspring.dto;

import com.shounoop.bikerentalspring.enums.BookBikeStatus;
import lombok.Data;

import java.util.Date;

@Data
public class BookABikeDto {
    private Long id;
    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookBikeStatus bookBikeStatus;
    private Long bikeId;
    private Long userId;
    private String username;
    private String email;
}
