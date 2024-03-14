import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class SellerEditModalService {

  private openModalSubject = new BehaviorSubject<any>(null);
  openModal$ = this.openModalSubject.asObservable();

  

  constructor() { }

  openModal(data: any): void {
    this.openModalSubject.next(data);
  }

}
