import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ISeller } from 'src/app/seller';
import { SellerService } from 'src/app/services/Seller/seller.service';
import { SellerEditModalService } from 'src/app/services/SellerEditModal/seller-edit-modal.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-seller-information',
  templateUrl: './seller-information.component.html',
  styleUrls: ['./seller-information.component.css']
})
export class SellerInformationComponent implements OnInit {

  seller:ISeller[] =[];
  
  totalRecords:number =0;

  columns = [
    { field: 'DealerProofID', header: 'DealerProof' },
    { field: 'SellerName', header: 'SellerName' },
    { field: 'SellerDOB', header: 'SellerDOB' },
    { field: 'DealerIdentity', header: 'DealerIdentity' },
    { field: 'LicPlateNumber', header: 'LicPlateNumber' },
    { field: 'Actions', header: 'Actions' }
  ];
  constructor(private sellerService:SellerService, 
              private modalService:ModalService, 
              private sellerEditModalService:SellerEditModalService,
              private toastr:ToastrService
              ) { }

  ngOnInit(): void {
    this.getAllSellerInfo();
  }

  private getAllSellerInfo(){
    this.sellerService.getSellerInfo().subscribe((data:ISeller[])=>{
      this.seller = data;
    })
  }

  //for add new seller
  openSellerModal(){
    this.modalService.openSellerModal('lg');
  }

  //for edit seller

  openSellerEditModal(item: any): void {
    console.log("button clicked")
    this.sellerEditModalService.openModal(item);
  }

  // deleteSeller(dealerId: number): void {
  //   const itemToDelete = confirm("Do you want to delete the Seller?");
    
  //   if (itemToDelete) {
  //     this.sellerService.deleteSellerInfo(dealerId).subscribe(() => {
  //       // Handle any post-deletion logic here if needed
  //       console.log('Seller deleted successfully.');
  //       this.getAllSellerInfo();

  //     });
  //   }
  // }

  public deleteSeller(item:ISeller){
    if (confirm("Do You Want to Delete?")){
    let position = this.seller.indexOf(item);
    this.seller.splice(position,1);

    this.toastr.error('Seller Deleted successfully');
  }
  }
  
  
}
