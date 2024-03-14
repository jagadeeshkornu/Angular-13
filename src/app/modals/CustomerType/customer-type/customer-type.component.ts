import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
 
import { CustomerTypeService } from 'src/app/services/CusomterType/customer-type.service';

import { SharedService } from 'src/app/services/Shared/shared.service';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.css']
})
export class CustomerTypeComponent implements OnInit {

  customerTypeForm!: FormGroup;
  customerType: any[] = [];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private customerTypeService:CustomerTypeService,
    private sharedService:SharedService,
    private toastr:ToastrService,
     
  ) {
    this.customerTypeForm = this.fb.group({
      CustomerTypeID: [''],
      CustomerTypeName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllBusinessType();
  }

  getAllBusinessType() {
    this.customerTypeService.getCustomerType().subscribe((data: any) => {
      this.customerType = data;
    });
  }

  submitForm(bg: FormGroup) {
    this.submitted = true;
    if (bg.invalid) {
      return;
    }

    const formData = bg.value;
    console.log(formData)
    const sameTypeAlreadyExist = this.customerType.find(type => type.CustomerTypeName === formData.CustomerTypeName);

    if (/^\s+$/.test(formData.CustomerTypeName)) {
      this.toastr.info("Please Enter Valid Name");
    } 

    else if(sameTypeAlreadyExist){
      this.toastr.info("Customer Type Already Existed");
    }

    else{
      this.customerTypeService.addCustomerType(formData).subscribe(() => {
      console.log("Customer Type added successfully");
      alert("Customer Type added successfully");
      this.activeModal.close();
      this.toastr.success('Customer Type added successfully');
      this.sharedService.triggerRefreshCustomerType(); 
      },
        (error) => {
          console.error('Error adding CustomerType:', error);
        }
      );

    }
   
  }

  close() {
    this.activeModal.close()
    
  }

}
