import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/customer';
 
import { IPurchaser } from 'src/app/purchaser';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { PurchaserService } from 'src/app/services/Purchaser/purchaser.service';
import { SharedService } from 'src/app/services/Shared/shared.service';
 

@Component({
  selector: 'app-purchaser-information',
  templateUrl: './purchaser-information.component.html',
  styleUrls: ['./purchaser-information.component.css'],
})
export class PurchaserInformationComponent implements OnInit {

  purchaser = [] as IPurchaser[];

  globalSearching:string ='';

  columns = [
    { field: 'DealerName', header: 'DealerName' },
    { field: 'Address1', header: 'Address1' },
    { field: 'Address2', header: 'Address2' },
    { field: 'City', header: 'City' },
    { field: 'State', header: 'State' },
    { field: 'ZipCode', header: 'ZipCode' },
    { field: 'DateOfPurchase', header: 'DateOfPurchase' },
    { field: 'Amount', header: 'Amount' },
    { field: 'PaymentMode', header: 'PaymentMode' },
    { field: 'PaymentNumber', header: 'PaymentNumber' },
    { field: 'EmployeeID', header: 'EmployeeID' },
    { field: 'Actions', header: 'Actions' }
  ];
  


  

  

  constructor(private purchaserService: PurchaserService,
              private modalService: ModalService,
              private toastr: ToastrService,
              private sharedService:SharedService
              ) {}



  ngOnInit(): void {
    this.getAllPurchaserInfo();
    this.sharedService.refreshPurchaser$.subscribe(()=>{
      this.getAllPurchaserInfo();
    })
  }

  openModal() {
    this.modalService.openPurchaserModal('xl');
  }

  //To get all the Purchaser Information
  getAllPurchaserInfo() {
    this.purchaserService.getAllPurchaserInfo().subscribe(
      (data: IPurchaser[]) => {
        this.purchaser = data;
      },
      (error) => {
        console.error('Error loading data:', error);
        // Handle error based on your requirements
      }
    );
  }
   
  globalSearch() {
    if (this.globalSearching === "") {
        this.getAllPurchaserInfo();
    } else {
      console.log(this.globalSearching);
        const searchTerm = this.globalSearching.toLowerCase();

        this.purchaser = this.purchaser.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm)
            )
        );
    }
  }


  editPurchaser(transcationID:number){
    this.purchaserService.getPurchaserById(transcationID).subscribe((result)=>{
      console.log(result);
      this.sharedService.setPurchaser(result);
      this.modalService.openPurchaserModal('xl');
    })
  }

  // deletePurchaser(transcationID: number): void {
     
  //   const itemToDelete = confirm("Do you want to delete the Purchaser?");
    
  //   if (itemToDelete) {
  //     this.purchaserService.deletePurchaserInfo(transcationID).subscribe(() => {
  //       // Handle any post-deletion logic here if needed
  //       console.log('Purchaser deleted successfully.');
  //       this.getAllPurchaserInfo();
  //       this.toastr.error("Purchaser deleted successfully.")

  //     },
  //     (error)=>{
  //       console.error("Error deleting Purchaser",error);
  //       this.toastr.error("Some thing went wrong");
  //     }
  //     );
  //   }
  // }

  public deletePurchaser(item:IPurchaser){
    if (confirm("Do You Want to Delete?")){
    let position = this.purchaser.indexOf(item);
    this.purchaser.splice(position,1);
    this.toastr.error('Employee Deleted successfully');
  }
  }
  
}
