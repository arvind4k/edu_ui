import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent }  from './home/home.component';
import { UserComponent }  from './user/user.component';
import { FeeCategoryComponent }  from './finance/fee.category.component';
import { FeeParticularComponent }  from './finance/fee.particular.component';
import { FeeListComponent }  from './finance/fee.list.component';
import { FeeParticularListComponent }  from './finance/particular.list.component';
import { FeeViewComponent }  from './finance/fee.view.component';
import { DiscountCategoryComponent } from './finance/discount/discountCategory.component';
import { DiscountComponent } from './finance/discount/discount.component';
import { DiscountCategoryListComponent } from './finance/discount/disCategory.list.component';
import { DiscountListComponent } from './finance/discount/discount.list.component';

import { UserService } from './user/user.service';
import { FeeService } from './finance/fee.service';
import { CommonService } from './common/common.service';
import { DiscountService } from './finance/discount/discount.service';
import { FineComponent } from './finance/fine.component';

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
    FineComponent
  ],
  providers:[ UserService, FeeService, CommonService, DiscountService, DatePipe ],
  bootstrap: [ HomeComponent ]
})
export class AppModule { }
