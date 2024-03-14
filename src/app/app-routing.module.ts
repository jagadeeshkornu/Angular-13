import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PurchaserInformationComponent } from './components/purchaser-information/purchaser-information.component';
import { AddPurchaserComponent } from './components/add-purchaser/add-purchaser.component';
import { AddSellerComponent } from './components/add-seller/add-seller.component';
import { SellerInformationComponent } from './components/seller-information/seller-information.component';
import { AuthGuard } from './components/guard/auth.guard';
 
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { BusinessModalComponent } from './modals/business-modal/business-modal.component';
import { CloseComponent } from './modals/Close/close/close.component';

const routes: Routes = [
 {path:'header', component:HeaderComponent},
 {path:'main', component:MainComponent},
 {path:'login', component:LoginComponent},
 {path:'register', component:RegisterComponent},
 {path:'main' , component:MainComponent ,canActivate:[AuthGuard]},
 {path:'purchaser-information', component:PurchaserInformationComponent},
 {path:'seller-information', component:SellerInformationComponent},
 {path:'add-purchaser', component:AddPurchaserComponent},
 {path:'add-seller', component:AddSellerComponent},
 {path:'add-customer', component:AddCustomerComponent},
 {path:'businessModal' , component:BusinessModalComponent},
 {path:'close', component:CloseComponent},
 {path:'', redirectTo :'/login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
