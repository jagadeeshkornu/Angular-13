import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISeller } from 'src/app/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  

  url = "https://localhost:44355/api/SellerInformation";

  private getHeaders(): HttpHeaders {
     
    const token = localStorage.getItem('Token'); // Get your stored token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  constructor(private http:HttpClient) { }

  getSellerInfo():Observable<ISeller[]>{
    const headers =this.getHeaders()
    return this.http.get<ISeller[]>(this.url, {headers});
  }

  addSeller(seller:ISeller):Observable<ISeller>{
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<ISeller>(this.url,seller,httpOptions)
  }


  updateSellerInfo(seller:ISeller):Observable<ISeller>{
    const httpOptions =  {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<ISeller>(this.url,seller,httpOptions);
  }
  

  deleteSellerInfo(dealerID:number):Observable<ISeller>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.delete<ISeller>(`${this.url}/${dealerID}`, httpOptions);
  }  
}
