import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/customer';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { SharedService } from 'src/app/services/Shared/shared.service';
@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

 

  customers:ICustomer[] =[];

  globalSearching!:string;

   

  // columns = [
  //   { field: 'CorporationID', header: 'Corporation' },
  //   { field: 'CustomerName', header: 'Customer Name' },
  //   { field: 'MobileNumber', header: 'Mobile Num' },
  //   { field: 'EmailID', header: 'Email ID' },
  //   { field: '', header: 'Status' },
  //   { field: 'OpeningBalance', header: ' Balance' },
  //   { field: 'Actions', header: 'Actions' }
  // ];

  constructor(private customerService:CustomerService,
              private modalService:ModalService,
              private sharedService:SharedService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCustomer();
    this.sharedService.refreshCustomers$.subscribe(() => {
      this.getAllCustomer();
    });

    this.sharedService.openModal$.subscribe(()=>{
      this.openModal();
    })
  }

  globalSearch() {
    if (this.globalSearching === "") {
        this.getAllCustomer();
    } 
    
    else {
        const searchTerm = this.globalSearching.toLowerCase();
        
        this.customers = this.customers.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm)
            )
        );
    }
  }

  public openModal() {
    this.modalService.openCustomerModal('lg');
    
  }

  editCustomer(id:number){
    this.customerService.getCustomerById(id).subscribe((result:ICustomer)=>{
      console.log(result)
      this.sharedService.setCustomerData(result);
      this.modalService.openCustomerModal('lg');
    });

    // this.result = {
    //   ID: undefined, // or remove this line if you want to keep it undefined
    //   CustomerID: undefined,
    //   CorporationID: 0,
    //   CustomerName: "",
    //   FederalID: undefined,
    //   CompanyName: undefined,
    //   ChecksToBePrintedAs: undefined,
    //   DoingBusinessAs: undefined,
    //   VendorID: undefined,
    //   SalutionID: undefined,
    //   FirstName: undefined,
    //   MiddleName: undefined,
    //   LastName: undefined,
    //   MobileNumber: undefined,
    //   AlternativeNumber: undefined,
    //   WorkNumber: undefined,
    //   FaxNumber: undefined,
    //   EmailID: undefined,
    //   CCEmailID: undefined,
    //   Website: undefined,
    //   AccountNumber: undefined,
    //   OpeningBalance: undefined,
    //   AsOfDate: undefined,
    //   BAName: undefined,
    //   BAAddress: undefined,
    //   CountryID: undefined,
    //   StateID: undefined,
    //   BACity: undefined,
    //   ZipCode: undefined,
    //   DAName: undefined,
    //   DAAddress: undefined,
    //   DACountryID: undefined,
    //   DAStateID: undefined,
    //   DABACity: undefined,
    //   DABAZipCode: undefined,
    //   BusinessTypeID: undefined,
    //   CreditDayID: undefined,
    //   DiscountPercentage: undefined,
    //   DiscountAccount: undefined,
    //   SendMethodID: undefined,
    //   CustomerTypeID: undefined,
    //   PaymentMethodID: undefined,
    //   COI_ExpirationDate: undefined,
    //   MSA_ExpirationDate: undefined
    // };
    
    
    
  }

  private getAllCustomer(){
    this.customerService.getCustomers().subscribe((result:any)=>{
      this.customers = result; 
    })
  }



  // deleteCustomer2(id:number){
  //   const itemToDelete = confirm("Do you want to delete Customer?");
  //   if(itemToDelete){
  //     this.customerService.deleteCustomer(id).subscribe(()=>{
  //       console.log("Customer deleted SuccessFully");
  //       this.toastr.error('Customer added Successfully', 'error');
  //       this.getAllCustomer();
  //     })
  //   }
  // }

  deleteCustomer(item:ICustomer){
    if (confirm("Do You Want to Delete?")){
      let position = this.customers.indexOf(item);
      this.customers.splice(position,1);
      this.toastr.error('Customer Deleted successfully');
    }
  }

}
