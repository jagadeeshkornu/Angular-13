import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CityService } from 'src/app/services/City/city.service';
import { StateService } from 'src/app/services/State/state.service';
import { PaymentmodeService } from 'src/app/services/PaymentMode/paymentmode.service';
import { PurchaserService } from 'src/app/services/Purchaser/purchaser.service';
import { IPurchaser } from 'src/app/purchaser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-purchaser',
  templateUrl: './add-purchaser.component.html',
  styleUrls: ['./add-purchaser.component.css']
})
export class AddPurchaserComponent implements OnInit {


  date3!: Date;

  purchaseForm!:FormGroup;

  submitted:boolean = false;

  purchaser:IPurchaser[] =[];

  states: any[] = [];
  cities: any[] = [];

  citiesForDropDown:any[] =[];
  paymentModes :any[] =[];

  isEdit:boolean = false;

 
  constructor(private formBuilder:FormBuilder,private stateService:StateService,private cityService:CityService,
    private paymentmodeSerivce:PaymentmodeService, private purchaserService:PurchaserService,
    private activeModal :NgbActiveModal ,
    private sharedService:SharedService,
    private toastr:ToastrService,
    private dataPipe:DatePipe
    ) { 
    this.purchaseForm = this.formBuilder.group({
      TranscationID: [''],
      DealerName: ['', [Validators.required, Validators.pattern('^[a-z A-Z ]{3,20}$')]],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Zipcode: ['', Validators.required],
      DateOfPurchase: ['', Validators.required],
      Amount: ['', Validators.required],
      PaymentMode: ['', Validators.required],
      PaymentNumber: ['', Validators.required],
      EmployeeID: ['', Validators.required],
      EmployeeSign: ['', Validators.required],
      UploadReceipt: ['']
    });
  }

  

  ngOnInit(): void {
    this.loadStates();
    this.loadPaymentmodes();
    this.loadPurchaser();
    this.sharedService.currentPurchaserData.subscribe((data:IPurchaser | null)=>{
      if(data != null){
        
        this.loadFormData(data);
      }
    })
    
  }


  private loadFormData(data:IPurchaser){

    const formattedDate = this.dataPipe.transform(data.DateOfPurchase, 'yyyy-MM-dd');
    // console.log(formattedDate);

    if(data){
      this.isEdit = true;
      this.purchaseForm.patchValue({
      TranscationID:data.TranscationID,
      DealerName: data.DealerName,
      Address1: data.Address1,
      Address2:data.Address2,
      State:data.State,
      City: data.City,
      Zipcode: data.ZipCode,
      DateOfPurchase: formattedDate,
      Amount:data.Amount,
      PaymentMode: data.PaymentMode,
      PaymentNumber: data.PaymentNumber,
      EmployeeID: data.EmployeeID,
      EmployeeSign: data.EmployeeSign,
      UploadReceipt:''
      })
    }
  }


  private loadPurchaser(){
    this.purchaserService.getAllPurchaserInfo().subscribe((res)=>{
      this.purchaser = res;

    })
  }

  


  private loadStates() {
    this.stateService.getStates().subscribe((data) => {
      this.states = data;
      
    });
  }

  private loadPaymentmodes(){
    this.paymentmodeSerivce.getPaymentModes().subscribe((res:any)=>{
      this.paymentModes = res;
    })
  }



  onStateChange() {
    const stateControl = this.purchaseForm.get('State')!;
    const selectedState = stateControl.value;
    // Now you can use selectedState to get cities or perform other actions
    this.cityService.getCities(selectedState).subscribe((result: any) => {
    this.cities = result;
    
    });
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
 
  submitForm(fg: FormGroup) {

    this.submitted = true;
  
    if (fg.invalid) {
      return;
    }
  
    const formData = fg.value;
  
    console.log(formData);
  
    if (this.isEdit) {
      // If in edit mode, update the existing item
      this.purchaserService.updatePurcahserInfo(formData).subscribe(
        () => {
          console.log("Purchaser Updated Successfully");
          this.sharedService.triggerRefreshPurchaser();

          this.activeModal.close();
          this.toastr.success("Purchaser Updated Successfully")
          // this.openDialog("Purchaser Updated SuccesFully");
          
        },
        (error) => {
          console.error('Error updating purchaser:', error);
        }
        
      );
      this.isEdit =false;
      fg.reset();

    } else {
      // If not in edit mode, add a new item
      this.purchaserService.addPurchaser(formData).subscribe(
        () => {
          
          console.log('Purchaser added successfully:');
          this.loadPurchaser();
          this.activeModal.close();

          //this.stopDisplay = true;
          // this.openDialog("Purchaser Added SuccesFully");
          
        },
        (error) => {
          console.error('Error adding purchaser:', error);
        }
      );
    }
  
    // Reset the form and other variables
    
    this.submitted = false;
    this.isEdit = false;
    
  }
 
  
}
