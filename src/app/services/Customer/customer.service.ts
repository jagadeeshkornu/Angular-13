import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/app/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl:string ="https://localhost:44355/api/CustomerInformation";

  constructor(private http:HttpClient) { }

  getCustomers():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<ICustomer> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.get<ICustomer>(`${this.apiUrl}/${id}`, httpOptions);
  }
  

  addCustomer(formdata:ICustomer):Observable<ICustomer[]>{
    const httpOptions = {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<ICustomer[]>(this.apiUrl,formdata,httpOptions);
  }

  updateCustomer(formdata:ICustomer):Observable<ICustomer[]>{
    const httpOptions = {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.put<ICustomer[]>(this.apiUrl,formdata,httpOptions);
  }

  deleteCustomer(id:number):Observable<ICustomer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<ICustomer>(`${this.apiUrl}/${id}`,httpOptions);
  }
}
