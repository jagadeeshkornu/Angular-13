import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import {TableModule} from 'primeng/table';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputTextModule} from 'primeng/inputtext';
import { PurchaserInformationComponent } from './components/purchaser-information/purchaser-information.component';
import { AddPurchaserComponent } from './components/add-purchaser/add-purchaser.component';
import { ModalService } from './services/Modal/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PasswordModule} from 'primeng/password';

import { DatePipe } from '@angular/common';
import { AddSellerComponent } from './components/add-seller/add-seller.component';
import { SellerInformationComponent } from './components/seller-information/seller-information.component';
import { SellerEditModalService } from './services/SellerEditModal/seller-edit-modal.service';
 
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { BusinessModalComponent } from './modals/business-modal/business-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { CloseComponent } from './modals/Close/close/close.component';
import { CustomerTypeComponent } from './modals/CustomerType/customer-type/customer-type.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PurchaserInformationComponent,
    AddPurchaserComponent,
    AddSellerComponent,
    SellerInformationComponent,
    AddCustomerComponent,
    CustomerInformationComponent,
    BusinessModalComponent,
    CloseComponent,
    CustomerTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    InputTextModule,
    PasswordModule,
    ToastrModule.forRoot(),
     
  ],
  providers: [ModalService,NgbActiveModal,DatePipe,SellerEditModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
