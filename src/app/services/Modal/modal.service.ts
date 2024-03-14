import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from 'src/app/components/add-customer/add-customer.component';
import { AddPurchaserComponent } from 'src/app/components/add-purchaser/add-purchaser.component';
import { AddSellerComponent } from 'src/app/components/add-seller/add-seller.component';
import { CloseComponent } from 'src/app/modals/Close/close/close.component';
import { CustomerTypeComponent } from 'src/app/modals/CustomerType/customer-type/customer-type.component';
import { BusinessModalComponent } from 'src/app/modals/business-modal/business-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService:NgbModal ) { }
  openPurchaserModal(size:'xl') {
    const modalOptions: NgbModalOptions = {
      size: size,
      centered: true,
    };

    const modalRef = this.modalService.open(AddPurchaserComponent, modalOptions);
    modalRef.componentInstance.modalSize = 'fullscreen'
  }


  openSellerModal(size:'lg') {
    const modalOptions: NgbModalOptions = {
      size: size,
      centered: true,
    };

    const modalRef = this.modalService.open(AddSellerComponent,  { ariaLabelledBy: 'modal-basic-title', size: 'custom-modal', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.modalSize = 'fullscreen'
  }

  
  openCustomerModal(size:'lg') {
    const modalOptions: NgbModalOptions = {
      size: 'lg',
      centered: true,
    };

    const modalRef = this.modalService.open(AddCustomerComponent, modalOptions);
    modalRef.componentInstance.modalSize = 'fullscreen'
  }

  openBusinessModal(): void {
    const modalRef = this.modalService.open(BusinessModalComponent, {
      size: 'lg',
      backdrop: 'static' // Ensure backdrop is set to 'static'
    });
    modalRef.componentInstance.modalSize = 'fullscreen';
  }

  closeModal(): void {
    const modalRef = this.modalService.open(CloseComponent, {
      size: 'md',
      centered: true, // Set this to true to center the modal
    });
    
  }

  openCustomerTypeModal(): void {
    const modalRef = this.modalService.open(CustomerTypeComponent, {
      size: 'lg',
      backdrop: 'static' // Ensure backdrop is set to 'static'
    });
    modalRef.componentInstance.modalSize = 'fullscreen';
  }

  
  
     
}

