import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {

  private apiUrl = 'https://localhost:44355/api/CustomerState/getbyCountry/';
  
   
  
  constructor(private http:HttpClient) {

   }

   getCities(countryId: string): Observable<any[]> {
    const url = this.apiUrl + countryId;
    return this.http.get<any[]>(url);
  }

  
}
