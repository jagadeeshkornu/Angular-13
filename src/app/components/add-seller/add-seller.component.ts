import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { ISeller } from 'src/app/seller';
import { SellerService } from 'src/app/services/Seller/seller.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DealerIdentityService } from 'src/app/services/DealerIdentity/dealer-identity.service';
import { DealerProofService } from 'src/app/services/DealerProof/dealer-proof.service';
import { Subscription } from 'rxjs';
import { SellerEditModalService } from 'src/app/services/SellerEditModal/seller-edit-modal.service';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {


  sellerData: any;
  private subscription!: Subscription;

  globalSearching:string ='';

  date3!: Date;

  submitted = false;

  purchaseForm: FormGroup;

  
  seller: ISeller[] = [];

  dealerProofInfo: any[]=[];

  dealeridentityInfo:any[] = [];


  isEdit:boolean =false;

  
 
  constructor(  private formBuilder: FormBuilder,
                private sellerService:SellerService,
                private dealerIdentityService :DealerIdentityService,
                private dealerproofService:DealerProofService,
                private datePipe: DatePipe,
                private activeModal:NgbActiveModal,
                private sellerModalService:SellerEditModalService
                                   
   
   
      ) {
        this.purchaseForm = this.formBuilder.group({
        DealerID:[''],
        DealerProofID: ['', Validators.required],
        SellerName: ['', Validators.required],
        sellersDateOfBirth: ['', Validators.required],
        sellersIdentification: [''],
        sellersSignature: [''],
        DealerIdentity: ['', Validators.required],
        LicPlateNumber: ['']
      });
  }
 
  ngOnInit(): void {
    this.getAllSellerInfo();
    this.getDealerIdentityInfo();
    this.getDealerProofInfo();
    this.subscription = this.sellerModalService.openModal$.subscribe((data) => {
      this.sellerData = data;
      // Open the modal here or perform other necessary actions
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
 
  close(){
    this.activeModal.close();
  }

  cancel(){
    this.activeModal.close();
  }

  resetForm(fg:FormGroup){
    fg.reset();
  }

  getAllSellerInfo(){
    this.sellerService.getSellerInfo().subscribe((data:ISeller[])=>{
      this.seller= data;
    })
  }
  

  getDealerProofInfo(){
    this.dealerproofService.getDealerProof().subscribe((data)=>{
      this.dealerProofInfo = data;
      // console.log(this.dealerProofInfo);
    })
  }
 
 
  getDealerIdentityInfo(){
    this.dealerIdentityService.getDealerIdentity().subscribe((res)=>{
      this.dealeridentityInfo = res;
      // console.log(this.dealeridentityInfo);
    })
  }

  submitForm(fg: FormGroup) {

    this.submitted = true;
  
    if (fg.invalid) {
      return;
    }
  
    const formData = fg.value;
  
    console.log(formData);
  
    if (this.isEdit) {
      // If in edit mode, update the existing item
      this.sellerService.updateSellerInfo(formData).subscribe(
        () => {
          console.log("Seller Updated Successfully");
          this.getAllSellerInfo();
           
          
        },
        (error) => {
          console.error('Error updating Seller:', error);
        }
        
      );
      this.isEdit =false;
      fg.reset();

    } else {
      // If not in edit mode, add a new item
      this.sellerService.addSeller(formData).subscribe(
        () => {
          
          alert('Seller added successfully:');
          this.getAllSellerInfo();
          this.activeModal.close();

          //this.stopDisplay = true;
          // this.openDialog("Purchaser Added SuccesFully");
          
        },
        (error) => {
          console.error('Error adding Seller:', error);
        }
      );
    }
  
    // Reset the form and other variables
    
    this.submitted = false;
    this.isEdit = false;
    
  }


}
