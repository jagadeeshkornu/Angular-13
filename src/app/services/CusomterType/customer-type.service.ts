import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  constructor(private http:HttpClient) { }

  apiUrl ="https://localhost:44355/api/CustomerType";

  getCustomerType():Observable<any>{
    return this.http.get(this.apiUrl);
  }
  
  addCustomerType(data:any):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<any>(this.apiUrl,data,httpOptions)
 
  }

}
