 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BusinessTypeService } from 'src/app/services/BusinessType/business-type.service';
 
import { SharedService } from 'src/app/services/Shared/shared.service';

interface IbusinessType{
  BusinessTypeID: number,
  BusinessTypeName:string,
  Description: string
}

@Component({
  selector: 'app-business-modal',
  templateUrl: './business-modal.component.html',
  styleUrls: ['./business-modal.component.css']
})
export class BusinessModalComponent implements OnInit {

  businessForm!: FormGroup;
  businessType: IbusinessType[] = [];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private businessService: BusinessTypeService,
    private sharedService:SharedService,
    private toastr:ToastrService
  ) {
    this.businessForm = this.fb.group({
      BusinessTypeID: [''],
      BusinessTypeName: ["", [Validators.required]],
      Description: [""]
    });
  }

  ngOnInit(): void {
    this.getAllBusinessType();
  }

  getAllBusinessType() {
    this.businessService.getBusinessType().subscribe((data: any) => {
      this.businessType = data;
    });
  }

  submitForm(bg: FormGroup) {
    this.submitted = true;
    if (bg.invalid) {
      return;
    }

    const formData = bg.value;
    const sameTypeAlreadyExist = this.businessType.find(type => type.BusinessTypeName === formData.BusinessTypeName);
    
    if (/^\s+$/.test(formData.BusinessTypeName)) {
      this.toastr.info("Please Enter Valid Name");
    } 

    else if(sameTypeAlreadyExist){
      this.toastr.info("Business Type Already Existed");
    }
    
    else {
      this.businessService.addBusinessType(formData).subscribe((newBusinessType) => {

        console.log("new added BusinessTypeID: " + newBusinessType.BusinessTypeID);
       
    

        console.log("Business Type added successfully");
      
        this.activeModal.close();
        this.toastr.success('Business Type added successfully');
        this.sharedService.updateNewBusinessType(newBusinessType.BusinessTypeID);
    
        this.sharedService.triggerRefreshCustomers(); // Update dropdown after successful addition
      },
        (error) => {
          console.error('Error adding BusinessType:', error);
        }
      );
    }
      
  }
    
  close() {
    this.activeModal.close() 
  }
}