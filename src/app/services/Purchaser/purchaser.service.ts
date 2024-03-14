import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurchaser } from 'src/app/purchaser';

@Injectable({
  providedIn: 'root'
})
export class PurchaserService {

  url ="https://localhost:44355/api/PurchaserInformation";

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {
     
    const token = localStorage.getItem('Token'); // Get your stored token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllPurchaserInfo(): Observable<IPurchaser[]> {
     return this.http.get<IPurchaser[]>(this.url);
  }

   

  addPurchaser(purchaser: IPurchaser): Observable<IPurchaser> {
    const headers = this.getHeaders();
    return this.http.post<IPurchaser>(this.url, purchaser,{headers} );
  }


  getPurchaserById(id: number): Observable<IPurchaser> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.get<IPurchaser>(`${this.url}/${id}`, httpOptions);
  }


  updatePurcahserInfo(purchaser:IPurchaser):Observable<IPurchaser>{
    const headers = this.getHeaders();
    return this.http.put<IPurchaser>(this.url,purchaser,{headers});
  }
  

  deletePurchaserInfo(TransactionID: number): Observable<IPurchaser> {
    const headers = this.getHeaders();
    return this.http.delete<IPurchaser>(`${this.url}/${TransactionID}`,{headers});
  }

}
