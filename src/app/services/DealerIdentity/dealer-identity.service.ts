import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerIdentityService {

  constructor(private http:HttpClient) { }

 
 
  dealerApiUrl ="https://localhost:44355/api/Dealeridentity";

  getDealerIdentity():Observable<any>{
    return this.http.get<any[]>(this.dealerApiUrl);
  }
}
