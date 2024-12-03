import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { StorageService } from '../../../auth/components/services/storage/storage.service'

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  searchBike(searchDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/default/bike/search`, searchDto)
  }

  getAllBikes(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/bikes`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllBikesbyId(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/bike/bookings/{user_id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getBikeById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/bike/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  bookABike(bookABike: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/customer/bike/book`, bookABike, {
      headers: this.createAuthorizationHeader()
    })
  }

  getBookingsByUserId(): Observable<any> {
    const userId = StorageService.getUserId()
      ? Number(StorageService.getUserId())
      : 0

    return this.http.get(`${BASIC_URL}/api/customer/bike/bookings/${userId}`, {
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
