import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http:HttpClient) { }

  apiUrl ="https://localhost:44355/api/PaymentMethod";

  getPaymentMethod():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
