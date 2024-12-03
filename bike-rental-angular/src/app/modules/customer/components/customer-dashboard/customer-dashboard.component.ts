import { Component } from '@angular/core'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  constructor(private service: CustomerService) {}

  bikes: any[] = []

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
}
