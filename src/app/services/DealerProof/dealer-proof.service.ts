import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealerProofService {

  constructor(private http:HttpClient) { }
 
 
 
  apiUrl ="https://localhost:44355/api/DealerProof";
 
  getDealerProof():Observable<any>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
