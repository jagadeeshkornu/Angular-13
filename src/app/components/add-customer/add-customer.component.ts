import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessTypeService } from 'src/app/services/BusinessType/business-type.service';
import { CorporationService } from 'src/app/services/Corporation/corporation.service';
import { CountryService } from 'src/app/services/Country/country.service';
import { CreditDaysService } from 'src/app/services/CreditDays/credit-days.service';
import { CustomerTypeService } from 'src/app/services/CusomterType/customer-type.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { CustomerStateService } from 'src/app/services/CustomerState/customer-state.service';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { PaymentMethodService } from 'src/app/services/PaymentMethod/payment-method.service';
import { SalutationService } from 'src/app/services/Salutation/salutation.service';
import { SendMethodService } from 'src/app/services/SendMethod/send-method.service';
import { SharedService } from 'src/app/services/Shared/shared.service';
import { ICustomer } from 'src/app/customer';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { DiscountAccountService } from 'src/app/services/DiscountAccount/discount-account.service';
 
 

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm! : FormGroup;

  customers:ICustomer[] =[];

  corporations :any[] =[];

  salutations:any[] =[];

  businessType :any[] =[];

  creditDays: any[] =[];

  DiscountAccounts: any[] =[];

  sendMethod:any[] =[];

  paymentMethod:any[] =[];

  customerType:any[] = [];

  countries:any[] = [];

  customerStates :any[] =[];

  activeButton: string = 'customerInformation';
 
  isEdit:boolean = false;

  submitted:boolean = false;
  
  disabledDropdown:boolean = false;

  sameAddress:boolean = false;
  
  saveNew : string ='';

  selectedDropdownItem:string='';

  constructor(private fb:FormBuilder,
              private corporationService:CorporationService, 
              private salutionService:SalutationService,
              private businessService:BusinessTypeService,
              private creditService:CreditDaysService,
              private customerTypeService:CustomerTypeService,
              private discountService:DiscountAccountService,
              private sendMethodService: SendMethodService,
              private paymentMethodService:PaymentMethodService,
              private countryService:CountryService,
              private customerState:CustomerStateService,
              private modalService:ModalService,
              private customerService:CustomerService,
              private activeModal :NgbActiveModal,
              private sharedService: SharedService,
              private toastr: ToastrService,
              
               ) { 

      this.customerForm = this.fb.group({
      // Customer Information
      ID:[''],
      CustomerID:[''],  
      CorporationID: [{ value: '', disabled: this.disabledDropdown }, Validators.required],
      CustomerName: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9 @!#$^&*()+_!`\\-=\\[\\]{};:\']{2,35}$')]],
      FederalID:['',Validators.pattern(/^\d{2}-\d{7}$/)],
      CompanyName:[''],
      ChecksToBePrintedAs:[''],
      DoingBusinessAs:[''],
      VendorID:[''],
      addCustomerToAllComponents : [false],
      SalutionID:[''],
      FirstName:[''],
      MiddleName:[''],
      LastName:[''],
      MobileNumber:['',Validators.pattern(/^\d{10,}/)],
      AlternativeNumber:['',Validators.pattern(/^\d{10,}/)],
      WorkNumber:['',Validators.pattern(/^\d{10,}/)],
      FaxNumber:['',Validators.pattern(/^\d{10,}/)],
      EmailID:['',Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$')],
      CCEmailID:['',Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$')],
      Website:['',Validators.pattern('^www\.[a-zA-Z0-9-]+\.(com)$')],
      AccountNumber:['',Validators.pattern('^[0-9]{5,18}$')],
      OpeningBalance: ['0.00',[
        Validators.pattern(/^\d{1,100}(\.\d{1,2})?$/), 
        Validators.min(0), // Minimum value
        Validators.max(100), // Maximum value
      ]],

      AsOfDate: [new Date()],

      //Address Details

      BAName: ['', Validators.pattern('^[a-zA-Z0-9 @!#$^&*()+_!`\\-=\\[\\]{};:\']{2,35}$')],
      BAAddress:[''],
      CountryID:[''],
      StateID:[''],
      BACity:[''],
      ZipCode:['',Validators.pattern(/^\d{5,6}$/)],
      DAName:['', Validators.pattern('^[a-zA-Z0-9 @!#$^&*()+_!`\\-=\\[\\]{};:\']{2,35}$')],
      DAAddress:[''],
      DACountryID:[''],
      DAStateID:[''],
      DACity:[''],
      DAZipCode:[''],
      SameDeliveryAddress: [false],

      // Additional Details

      BusinessTypeID:[''],
      CreditDayID:[''],
      DiscountPercentage:['0.00',[
            Validators.pattern(/^\d{1,2}(\.\d{1,2})?$/), 
            Validators.min(0), // Minimum value
            Validators.max(100), // Maximum value
          ],],
      DiscountAccount:[''],
      SendMethodID:[''],
      CustomerTypeID:[''],
      PaymentMethodID:[''],
      COI_ExpirationDate:[''],
      MSA_ExpirationDate:[''],
      Notes : ['']
    })
  }



  ngOnInit(): void {
    this.getAllCustomer();
    this.getCorporations();
    this.getSalutions();
    this.getAllBusinessTypes();
    this.getAllCreditDays();
    this.getAllCustomerType();
    this.getAllPaymentMethod();
    this.getAllDiscountAccount();
    this.getAllSendMethod();
    this.getAllCountries();

    this.sharedService.refreshCustomerType$.subscribe(()=>{
      this.getAllCustomerType();
    });

    this.sharedService.refreshCustomers$.subscribe(()=>{
      this.getAllBusinessTypes();
    });

    

    this.sharedService.newBusinessType$.subscribe((BusinessTypeID) => {

      if (BusinessTypeID) {
        this.customerForm.get('BusinessTypeID')?.setValue(BusinessTypeID);
      }
    });
      

    this.sharedService.currentCustomerData.subscribe((data: ICustomer | null) => {
      if (data !== null) {
        this.disabledDropdown = true;
        this.loadFormData(data);
      }
      
    });
    
     
  }

  

  

  private loadFormData(data:ICustomer) {

    if (data) {
      
      this.isEdit= true;
      this.customerForm.patchValue({

        ID: data.ID,
        CustomerID: data.CustomerID,
        CorporationID: data.CorporationID,
        CustomerName: data.CustomerName,
        FederalID: data.FederalID,
        CompanyName: data.CompanyName,
        ChecksToBePrintedAs:data.ChecksToBePrintedAs,
        DoingBusinessAs:data.DoingBusinessAs,
        VendorID:data.VendorID,
        SalutionID:data.SalutionID,
        FirstName:data.FirstName,
        MiddleName:data.MiddleName,
        LastName:data.LastName,
        MobileNumber:data.MobileNumber,
        AlternativeNumber:data.AlternativeNumber,
        WorkNumber:data.WorkNumber,
        FaxNumber:data.FaxNumber,
        EmailID:data.EmailID,
        CCEmailID :data.CCEmailID,
        Website : data.Website,
        AccountNumber: data.AccountNumber,
        OpeningBalance : data.OpeningBalance,
        AsOfDate:data.AsOfDate ? new Date (data.AsOfDate) :null,
        BAName:data.BAName,
        BAAddress:data.BAAddress,
        CountryID:data.CountryID,
        StateID:data.StateID,
        BACity:data.BACity,
        ZipCode:data.ZipCode,
        DAName:data.DAName,
        DAAddress:data.DAAddress,
        DACountryID:data.DACountryID,
        DAStateID:data.DAStateID,
        DABACity:data.DABACity,
        DABAZipCode: data.DABAZipCode,
        BusinessTypeID:data.BusinessTypeID,
        CreditDayID:data.CreditDayID,
        DiscountPercentage:data.DiscountPercentage,
        DiscountAccount:data.DiscountAccount,
        SendMethodID:data.SendMethodID,
        CustomerTypeID:data.CustomerTypeID,
        PaymentMethodID:data.PaymentMethodID,
        COI_ExpirationDate: data.COI_ExpirationDate ? new Date(data.COI_ExpirationDate) : null,
        MSA_ExpirationDate: data.MSA_ExpirationDate ? new Date(data.MSA_ExpirationDate) : null,
        Notes:data.Notes
      });
      
    }
     
     
  }

  
  private getSalutions(){
    this.salutionService.getSalutations().subscribe((res)=>{
      this.salutations = res;
    });
  }

  openModal() {
    this.modalService.openBusinessModal();
  }

  openCustomerTypeModal(){
    this.modalService.openCustomerTypeModal()
  }

  close() {
    this.activeModal.close();
     
  }
  
  cancel() {
    this.activeModal.close();  
  }
  
  resetForm() {
     this.customerForm.reset();
  }
  

  setActiveButton(button: string) {
    this.activeButton = button;
  }


  private getAllCustomer(){
    this.customerService.getCustomers().subscribe((result:any)=>{
      this.customers = result; 
    })
  }
   
  private getCorporations(){
    this.corporationService.getCorporations().subscribe((res:any)=>{
      this.corporations = res;
      this.corporations.sort((a,b) =>
        a.CorporationName.toUpperCase().localeCompare(b.CorporationName.toUpperCase())
      );
      
    })
  }

 

  private getAllBusinessTypes(){
    this.businessService.getBusinessType().subscribe((res:any)=>{
      this.businessType = res;
      this.businessType.sort((a, b) =>
         a.BusinessTypeName.toUpperCase().localeCompare(b.BusinessTypeName.toUpperCase())
      );

    })
  }

  private getAllCreditDays(){
    this.creditService.getCreditDays().subscribe((res:any)=>{
      this.creditDays = res;
      this.creditDays.sort((a,b) => 
        a.CreditDayName.toUpperCase().localeCompare(b.CreditDayName.toUpperCase())
      );

      
    })
  }

  private getAllCustomerType(){
    this.customerTypeService.getCustomerType().subscribe((res:any)=>{
      this.customerType = res;
      this.customerType.sort((a,b)=>
        a.CustomerTypeName.toUpperCase().localeCompare(b.CustomerTypeName.toUpperCase())
      );
       
    })
  }

  private getAllPaymentMethod(){
    this.paymentMethodService.getPaymentMethod().subscribe((res:any)=>{
      this.paymentMethod = res;
      this.paymentMethod.sort((a,b)=>
        a.PaymentMethodName.toUpperCase().localeCompare(b.PaymentMethodName.toUpperCase())
      );
    })
  }

  private getAllDiscountAccount(){
    this.discountService.getDiscountAccount().subscribe((res:any)=>{
      this.DiscountAccounts = res;
    })
  }

  private getAllSendMethod(){
    this.sendMethodService.getSendMethod().subscribe((res:any)=>{
      this.sendMethod = res;
      this.sendMethod.sort((a,b)=>
        a.SendMethodName.toUpperCase().localeCompare(b.SendMethodName.toUpperCase())
      );
    })
  }

  private getAllCountries(){
    this.countryService.getCountries().subscribe((res)=>{
      this.countries = res;
    })

  }

  onCountryChange() {
    const countryControl = this.customerForm.get('CountryID')!;
    const selectedCountry = countryControl.value;
    this.customerState.getCities(selectedCountry).subscribe((result: any) => {
    this.customerStates = result;
    
    });
  }


  onAddressChange() {
    this.sameAddress = this.customerForm.get('SameDeliveryAddress')?.value;
  }
  

  // For opening Balance 0.00 default


  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // If the input is empty, set the value to "0.00"
    if (inputValue.trim() === '') {
      this.customerForm.get('OpeningBalance')?.setValue('0.00');
      
    }
    if (inputValue.trim() === '') {
      this.customerForm.get('DiscountPercentage')?.setValue('0.00');
      
    }
  }
  
  //for automatically take 12-22323

  onFederalIdInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters
  
    if (inputValue.length > 2) {
      // Insert '-' after the first two digits
      inputValue = inputValue.substring(0, 2) + '-' + inputValue.substring(2);
    }
  
    this.customerForm.get('FederalID')?.setValue(inputValue);
  }

  onDropdownChange(event: Event) {
    // Handle the dropdown change event
    const target = event.target as HTMLSelectElement;
    this.selectedDropdownItem = target.value;
    this.customerForm.patchValue({ DiscountAccount: this.selectedDropdownItem });
  }

  //save and New
  save(data: string) {
    this.saveNew = data;
    console.log(this.saveNew);
  }

  

  submitForm(fg: FormGroup) {
    this.submitted = true;

    if (fg.invalid) {
      return;
    }
  
    const formdata = fg.value;
    console.log(formdata);

    if(this.sameAddress)
          {
            formdata['DAName'] = formdata.BAName,
            formdata['DAAddress'] = formdata.BAAddress,
            formdata['DACountryID'] = formdata.CountryID,
            formdata['DAStateID'] = formdata.StateID,
            formdata['DACity'] = formdata.BACity,
            formdata['DAZipCode']= formdata.ZipCode

    }

    if (!formdata.addCustomerToAllComponents) {
      if (!this.isEdit) {
        console.log("Adding: "+this.isEdit)
        const checkAlreadyExistCustomer = this.customers.find(m => m.CustomerName === formdata.CustomerName);
  
        if (checkAlreadyExistCustomer) {
          this.toastr.info(`${checkAlreadyExistCustomer.CustomerName} is already existed`);
        } 
        else {
          this.customerService.addCustomer(formdata).subscribe(
            (data) => {
              console.log(data);
             
              this.activeModal.close();
              console.log("Customer added Successfully");
              this.toastr.success('Customer added Successfully');
              this.sharedService.triggerRefreshCustomers();
              debugger;
              this.isEdit = false;
              if(this.saveNew === 'saveNew'){
                this.sharedService.triggerOpenModal();
              }
            },
            (error) => {
              console.error('Error adding customer:', error);
            }
          );
        }
      } else {
        console.log("Updating: "+this.isEdit)
        const updateCustomer = () => {
          this.customerService.updateCustomer(formdata).subscribe(
            () => {
              this.activeModal.close();
              console.log("Customer Updated Successfully");
              this.toastr.success('Customer Updated Successfully');
              this.sharedService.triggerRefreshCustomers();
              this.isEdit = false;
              console.log(this.isEdit);
            },
            (error) => {
              console.error('Error updating customer:', error);
            }
          );
          debugger;
          this.isEdit = false;
          this.customerForm.reset();
        };
  
        updateCustomer();
      }

    } else {
      const corporationLength = this.corporations.length;
  
      if (!this.isEdit) {
        this.customerService.addCustomer(formdata).pipe(
          concatMap(() => {
            const observables = [];
            for (let i = 1; i <= corporationLength; i++) {
              const clonedFormData = { ...formdata, CorporationID: i };
              console.log("Corporations :", clonedFormData);
              observables.push(this.customerService.addCustomer(clonedFormData));
            }
            return forkJoin(observables);
          }),
          finalize(() => {
            this.activeModal.close();
            console.log("Customers added Successfully");
            this.toastr.success('Customers added Successfully');
            this.sharedService.triggerRefreshCustomers();
            this.isEdit = false;
          })
        ).subscribe(
          () => { },
          (error) => {
            console.error('Error adding customers:', error);
            this.toastr.error("Error adding customers");
          });
      } 
      
      else {
        const updateCustomer = () => {
          this.customerService.updateCustomer(formdata).subscribe(
            () => {
              this.activeModal.close();
              console.log("Customer Updated Successfully");
              this.toastr.success('Customer Updated Successfully');
              this.sharedService.triggerRefreshCustomers();
            },
            (error) => {
              console.error('Error updating customer:', error);
            }
          );
          this.isEdit = false;
          this.customerForm.reset();
        };
  
        updateCustomer();
      }
    }
  }
  

  
  
}
