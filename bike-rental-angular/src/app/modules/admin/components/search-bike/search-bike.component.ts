import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AdminService } from '../../services/admin.service'

@Component({
  selector: 'app-search-bike',
  templateUrl: './search-bike.component.html',
  styleUrl: './search-bike.component.scss'
})
export class SearchBikeComponent {
  searchBikeForm!: FormGroup
  listOfOption: Array<{ label: string; value: string }> = []
  listOfBrands = [
    'Yamaha', 'Honda', 'Suzuki', 'Kawasaki', 
    'Ducati', 'BMW', 'Harley-Davidson', 
    'Royal Enfield', 'Triumph', 'KTM', 
    'Aprilia', 'Hero', 'Bajaj', 'TVS'
  ];
  
  listOfType = [
    'Sports Bike', 'Cruiser', 'Naked Bike', 
    'Commuter', 'Adventure Bike', 'Scrambler'
  ];
  
  listOfColor = [
    'Blue', 'Red', 'Black', 'Green', 
    'White', 'Silver', 'Orange'
  ];
  
  listOfTransmission = [
    'Manual', 'Automatic'
  ];
  
  isSpinning = false
  Bikes: any[] = []

  constructor(
    private fb: FormBuilder,
    private service: AdminService
  ) {
    this.searchBikeForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    })
  }

  searchBike() {
    this.isSpinning = true
    this.service.searchBike(this.searchBikeForm.value).subscribe(
      res => {
        this.isSpinning = false

        const bikeDtoList = res.bikeDtoList

        bikeDtoList.forEach((bike: any) => {
          bike.processedImage = `data:image/jpeg;base64,${bike.returnedImage}`
          this.Bikes.push(bike)
        })
      },
      err => {
        this.isSpinning = false
      }
    )
  }
}
