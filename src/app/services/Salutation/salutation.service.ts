import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalutationService {

  constructor(private http:HttpClient) { }

  public getSalutations():Observable<any>{
    return this.http.get("https://localhost:44355/api/Salution")
  }
}
