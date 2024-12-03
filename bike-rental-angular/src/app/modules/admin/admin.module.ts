import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { PostBikeComponent } from './components/post-bike/post-bike.component'
import { NgZorroImportsModule } from '../../NgZorroImportsModule'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateBikeComponent } from './components/update-bike/update-bike.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { SearchBikeComponent } from './components/search-bike/search-bike.component'

@NgModule({
  declarations: [AdminDashboardComponent, PostBikeComponent, UpdateBikeComponent, GetBookingsComponent, SearchBikeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule {}
