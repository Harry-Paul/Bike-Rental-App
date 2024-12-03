import { Component } from '@angular/core'
import { AdminService } from '../../services/admin.service'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  bikes: any[] = []

  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getAllBikes()
  }

  getAllBikes() {
    this.adminService.getAllBikes().subscribe(res => {
      res.forEach((bike: any) => {
        bike.processedImage = `data:image/jpeg;base64,${bike.returnedImage}`
        this.bikes.push(bike)
      })
    })
  }

  deleteBike(id: number) {
    this.adminService.deleteBike(id).subscribe(res => {
      this.bikes = this.bikes.filter(bike => bike.id !== id)

      this.message.success('Bike deleted successfully', { nzDuration: 3000 })
    })
  }
}
