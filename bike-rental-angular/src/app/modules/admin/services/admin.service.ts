import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { StorageService } from '../../../auth/components/services/storage/storage.service'

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  postBike(bikeDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/bike`, bikeDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllBikes(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/bikes`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteBike(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/admin/bike/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getBikeById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/bike/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateBike(bikeId: number, bikeDto: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/admin/bike/${bikeId}`, bikeDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getBikeBookings(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/bike/bookings`, {
      headers: this.createAuthorizationHeader()
    })
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(
      `${BASIC_URL}/api/admin/bike/booking/${bookingId}/${status}`,
      {
        headers: this.createAuthorizationHeader()
      }
    )
  }

  searchBike(searchDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/bike/search`, searchDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders()

    return authHeaders.set(
      'Authorization',
      `Bearer ${StorageService.getToken()}`
    )
  }
}
