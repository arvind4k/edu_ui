import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent }  from './home/home.component';
import { UserComponent }  from './profile/user/user.component';
import { FeeCategoryComponent }  from './finance/fee.category.component';
import { FeeParticularComponent }  from './finance/fee.particular.component';
import { FeeListComponent }  from './finance/fee.list.component';
import { FeeParticularListComponent }  from './finance/particular.list.component';
import { FeeViewComponent }  from './finance/fee.view.component';
import { DiscountCategoryComponent } from './finance/discount/discountCategory.component';
import { DiscountComponent } from './finance/discount/discount.component';
import { DiscountCategoryListComponent } from './finance/discount/disCategory.list.component';
import { DiscountListComponent } from './finance/discount/discount.list.component';

import { UserService } from './profile/user/user.service';
import { FeeService } from './finance/fee.service';
import { AuthenticationService } from './login/authentication.service'
import { CommonService } from './common/common.service';
import { DiscountService } from './finance/discount/discount.service';
import { FineComponent } from './finance/fine.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './login/can-activate.authguard';
import { MenuComponent } from './home/menu.component';
import { MainComponent } from './home/main.component';
import { AddressComponent } from './common/address/address.component';
import { AddressService } from './common/address/address.service';
import { EorgComponent } from './profile/eorg/eorg.component';
import { EorgService } from './profile/eorg/eorg.service';
import { TransportComponent } from './admin/transport/transport.component';
import { TransportService } from './admin/transport/transport.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    FeeCategoryComponent,
    FeeParticularComponent,
    FeeListComponent,
    FeeParticularListComponent,
    FeeViewComponent,
    DiscountCategoryComponent,
    DiscountComponent,
    DiscountCategoryListComponent,
    DiscountListComponent,
    FineComponent,
    LoginComponent,
    MenuComponent,
    MainComponent,
    AddressComponent,
    TransportComponent,
    EorgComponent
  ],
  providers:[ UserService, FeeService, CommonService, DiscountService, DatePipe, 
              AuthenticationService, CanActivateAuthGuard, AddressService, TransportService, EorgService],
  
  bootstrap: [ MainComponent ]
})
export class AppModule { }
