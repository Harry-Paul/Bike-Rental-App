import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class DefaultService {
  constructor(private http: HttpClient) {}

  getAllBikes(): Observable<any> {
    console.log("wer")
    console.log(this.http.get("http://localhost:8080/api/default/bikes"))
    return this.http.get("http://localhost:8080/api/default/bikes")
  }

  searchBike(searchDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/default/bike/search`, searchDto)
  }
}