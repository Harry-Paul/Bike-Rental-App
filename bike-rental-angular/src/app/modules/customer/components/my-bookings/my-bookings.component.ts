import { Component } from '@angular/core'
import { CustomerService } from '../../services/customer.service'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from '../../../../auth/components/services/storage/storage.service'

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  constructor(private service: CustomerService) {}

  bookings: any[] = []
  isSpinning = false
  bikes: any[] = []
  bikes1: any[] = []

  ngOnInit() {
    this.getBookingsByUserId();
    
  }

  getAllBikes() {
    console.log("rty",this.bookings);
		this.bookings.forEach(booking=>{
      this.service.getBikeById(booking.bikeId).subscribe(res=>{
        res.returnedImage = `data:image/jpeg;base64,${res.returnedImage}`
        this.bikes.push(res);
      })
    })
    console.log(this.bikes)
	}

  private getBookingsByUserId() {
    this.isSpinning = true

    this.service.getBookingsByUserId().subscribe(
      data => {
        this.bookings = data
        console.log(this.bookings);
        this.getAllBikes();
        this.isSpinning = false
      },
      error => {
        console.log(error)
        this.isSpinning = false
      }
    )
    
  }
}
