
import { Component } from '@angular/core'
		import { FormBuilder, FormGroup } from '@angular/forms'
		import { DefaultService } from './services/default.service'

@Component({
		selector: 'app-customer-dashboard',
templateUrl: './default.component.html'
		})
export class DefaultComponent {

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
	bikes: any[] = []
	bikes1: any[] = []

	constructor(
			private fb: FormBuilder,
			private service: DefaultService,

			) {
		this.searchBikeForm = this.fb.group({
				brand: [null],
		type: [null],
		transmission: [null],
		color: [null]
    })
	}




	ngOnInit() {
		this.getAllBikes()
	}

	getAllBikes() {
		this.service.getAllBikes().subscribe(res => {
				res.forEach((bike: any) => {
			bike.processedImage = `data:image/jpeg;base64,${bike.returnedImage}`
			this.bikes.push(bike)
		})
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
			this.bikes1.push(bike)
		})
      },
		err => {
				this.isSpinning = false
		}
    )
	}
}
