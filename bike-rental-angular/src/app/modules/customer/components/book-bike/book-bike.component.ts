import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CustomerService } from '../../services/customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StorageService } from '../../../../auth/components/services/storage/storage.service'
import { NzMessageService } from 'ng-zorro-antd/message'

const DATE_FORMAT = 'MM-DD-YYYY'

@Component({
  selector: 'app-book-bike',
  templateUrl: './book-bike.component.html',
  styleUrl: './book-bike.component.scss'
})
export class BookBikeComponent {
  constructor(
    private service: CustomerService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  bikeId: number = this.activeRoute.snapshot.params['id']
  bike: any
  validateForm!: FormGroup
  isSpinning: boolean = false

  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    })

    this.getBikeById()
  }

  bookABike(data: any) {
    this.isSpinning = true

    let bookABikeDto = {
      fromDate: Date.now(),
      toDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
      userId: StorageService.getUserId(),
      bikeId: this.bikeId
    }

    this.service.bookABike(bookABikeDto).subscribe(
      res => {
        this.isSpinning = false

        this.message.success('Bike booked successfully')
        this.router.navigateByUrl('/customer/dashboard')
      },

      error => {
        this.isSpinning = false
        this.message.error('Error occurred while booking the bike')
      }
    )
  }

  private getBikeById() {
    this.service.getBikeById(this.bikeId).subscribe(res => {
      this.bike = res
      this.bike.processedImage = `data:image/jpeg;base64,${res.returnedImage}`
    })
  }
}
