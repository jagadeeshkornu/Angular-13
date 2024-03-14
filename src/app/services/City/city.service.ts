import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://localhost:44355/api/city/getbyStateId/';
  
  private urlForCities = 'https://localhost:44355/api/city';
  
  constructor(private http:HttpClient) {

   }

   getCities(stateId: string): Observable<any[]> {
    const url = this.apiUrl + stateId;
    return this.http.get<any[]>(url);
  }

  getCitiesForDropDown(): Observable<any[]> {
    return this.http.get<any[]>(this.urlForCities);
  }
  


}
