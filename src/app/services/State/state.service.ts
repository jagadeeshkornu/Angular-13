import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private apiUrl = 'https://localhost:44355/api/State';
  constructor(private http:HttpClient) { 
  }

  token = localStorage.getItem('Token');

  getStates(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${this.token}`,
    })
    return this.http.get<any[]>(this.apiUrl,{headers});
  }
}
