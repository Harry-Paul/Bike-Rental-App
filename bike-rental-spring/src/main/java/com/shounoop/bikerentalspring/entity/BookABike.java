package com.shounoop.bikerentalspring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shounoop.bikerentalspring.dto.BookABikeDto;
import com.shounoop.bikerentalspring.enums.BookBikeStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class BookABike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookBikeStatus bookBikeStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore // @JsonIgnore is used to ignore the user field when serializing the object to JSON.
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bike_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Bike bike;

    public BookABikeDto getBookABikeDto() {
        BookABikeDto bookABikeDto = new BookABikeDto();
        bookABikeDto.setId(this.id);
        bookABikeDto.setDays(this.days);
        bookABikeDto.setBookBikeStatus(this.bookBikeStatus);
        bookABikeDto.setPrice(this.price);
        bookABikeDto.setToDate(this.toDate);
        bookABikeDto.setFromDate(this.fromDate);
        bookABikeDto.setEmail(this.user.getEmail());
        bookABikeDto.setUsername(this.user.getName());
        bookABikeDto.setUserId(this.user.getId());
        bookABikeDto.setBikeId(this.bike.getId());
        return bookABikeDto;
    }
}
