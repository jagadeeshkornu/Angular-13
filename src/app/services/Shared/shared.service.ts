import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICustomer } from 'src/app/customer';
import { IPurchaser } from 'src/app/purchaser';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  private customerData = new BehaviorSubject<ICustomer | null>(null);
  currentCustomerData = this.customerData.asObservable();

  constructor() {}

  setCustomerData(data: ICustomer) {
    this.customerData.next(data);
    
  }


  private purchaserData= new BehaviorSubject<IPurchaser|null>(null);
  currentPurchaserData = this.purchaserData.asObservable();

  setPurchaser (data: IPurchaser){
    this.purchaserData.next(data);
  }



  private refreshCustomersSource = new Subject<void>();

  refreshCustomers$ = this.refreshCustomersSource.asObservable();

  triggerRefreshCustomers() {   
    this.refreshCustomersSource.next();
  }


  private refreshPurchaserInfo = new Subject<void>();
  refreshPurchaser$ = this.refreshPurchaserInfo.asObservable()
  triggerRefreshPurchaser(){
    this.refreshPurchaserInfo.next();
  }


  private refreshCustomerTypeSource = new Subject<void>();

  refreshCustomerType$ = this.refreshCustomersSource.asObservable();

  triggerRefreshCustomerType() {
    this.refreshCustomerTypeSource.next();
  }


  private newBusinessTypeSubject  = new BehaviorSubject<any>(null)

  newBusinessType$ = this.newBusinessTypeSubject.asObservable();

  updateNewBusinessType(newBusinessType:any){
    
    this.newBusinessTypeSubject.next(newBusinessType);
  }


  private openCustomerModalSource = new Subject<void>();

  openModal$ = this.openCustomerModalSource.asObservable();

  triggerOpenModal() {
    this.openCustomerModalSource.next();
  }

}
