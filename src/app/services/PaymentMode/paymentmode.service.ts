import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentmodeService {

  private url = "https://localhost:44355/api/PaymentMode";

  constructor(private http:HttpClient) { }

  getPaymentModes():Observable<any[]>{

    return this.http.get<any[]>(this.url);
  }
}
