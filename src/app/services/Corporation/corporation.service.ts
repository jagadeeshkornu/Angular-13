import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporationService {

  constructor(private http:HttpClient) { }

  getCorporations():Observable<any>{
    return this.http.get("https://localhost:44355/api/Corporation");
  }
}
