import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountAccountService {

  constructor(private http:HttpClient) { }

  apiUrl ="https://localhost:44355/api/Discount";

  getDiscountAccount():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
