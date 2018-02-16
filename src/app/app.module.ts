import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent }  from './home/home.component';
import { ProfileComponent }  from './profile/user/profile.component';
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

import { ProfileService } from './profile/user/profile.service';
import { FeeService } from './finance/fee.service';
import { AuthenticationService } from './login/authentication.service'
import { CommonService } from './common/common.service';
import { DiscountService } from './finance/discount/discount.service';
import { FineComponent } from './finance/fine.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './login/can-activate.authguard';
import { MenuComponent } from './home/menu.component';
import { MainComponent } from './home/main.component';

import { HeaderComponent } from './home/header.component';

import { PersonalInfoComponent } from './profile/user/personalinfo.component';
import { SchoolInfoComponent } from './profile/user/schoolinfo.component';
import { AdditionalInfoComponent } from './profile/user/additionalinfo.component';
import { ParentInfoComponent } from './profile/user/parentinfo.component';
import { EducationInfoComponent } from './profile/user/educationinfo.component';
import { AddressComponent } from './common/address/address.component';
import { AddressService } from './common/address/address.service';
import { EorgComponent } from './profile/eorg/eorg.component';
import { EorgService } from './profile/eorg/eorg.service';
import { TransportComponent } from './admin/transport/transport.component';
import { TransportService } from './admin/transport/transport.service';
import { DepartmentComponent } from './admin/department/department.component';
import { DepartmentService } from './admin/department/department.service';
import { CourseComponent } from './admin/course/course.component';
import { CourseService } from './admin/course/course.service';
import { SchoolYearComponent } from './admin/schoolyear/schoolyear.component';
import { SchoolYearService } from './admin/schoolyear/schoolyear.service';
import { RoleComponent } from './admin/security/role.component';
import { RoleService } from './admin/security/role.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    HomeComponent,
    ProfileComponent,
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
    HeaderComponent,
    AddressComponent,
    TransportComponent,
    DepartmentComponent,
    CourseComponent,
    SchoolYearComponent,
    RoleComponent,
    EorgComponent,
    PersonalInfoComponent,
    SchoolInfoComponent,
    AdditionalInfoComponent,
    ParentInfoComponent,
    EducationInfoComponent
  ],
  providers:[ ProfileService, FeeService, CommonService, DiscountService, DatePipe, 
              AuthenticationService, CanActivateAuthGuard, AddressService, TransportService, DepartmentService, CourseService, SchoolYearService, RoleService, EorgService],
  
  bootstrap: [ MainComponent ]
})
export class AppModule { }
