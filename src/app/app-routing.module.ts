import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { UserComponent }   from './user/user.component';
import { HomeComponent }   from './home/home.component';
import { ProfileComponent }   from './profile/user/profile.component';
import { UserComponent }   from './profile/user/user.component';
import { FeeCategoryComponent }   from './finance/fee.category.component';
import { FeeParticularComponent }   from './finance/fee.particular.component';
import { FeeListComponent }   from './finance/fee.list.component';
import { FeeParticularListComponent }  from './finance/particular.list.component';
import { FeeViewComponent }  from './finance/fee.view.component';
import { DiscountCategoryComponent } from './finance/discount/discountCategory.component';
import { DiscountComponent } from './finance/discount/discount.component';
import { DiscountCategoryListComponent } from './finance/discount/disCategory.list.component';
import { DiscountListComponent } from './finance/discount/discount.list.component';
import { FineComponent } from './finance/fine.component';
import { LoginComponent } from './login/login.component';
import { EorgComponent } from './profile/eorg/eorg.component';
import { TransportComponent } from './admin/transport/transport.component';
import { DepartmentComponent } from './admin/department/department.component';
import { CourseComponent } from './admin/course/course.component';
import { SchoolYearComponent } from './admin/schoolyear/schoolyear.component';
import { RoleComponent } from './admin/security/role.component';

import { CanActivateAuthGuard } from './login/can-activate.authguard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'home',  component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'signup', component: UserComponent},
  { path: 'feeCategory/:feeId', component: FeeCategoryComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'feeParticular/:feeId', component: FeeParticularComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'feeParticular/edit/:particualrId', component: FeeParticularComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'feeList/:id', component: FeeListComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'particularList/:feeId/:batchId', component: FeeParticularListComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'feeView/:feeId/:batchId', component: FeeViewComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'discount/category/:discountCategoryId', component: DiscountCategoryComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'discount/categorylist', component: DiscountCategoryListComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'discount/:discountId', component: DiscountComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'discount', component: DiscountListComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'fine', component: FineComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'transport', component: TransportComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'transport/:action', component: TransportComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'department', component: DepartmentComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'department/:action', component: DepartmentComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'course', component: CourseComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'course/:action', component: CourseComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'eorg', component: EorgComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'eorg/:action', component: EorgComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'schoolyear', component: SchoolYearComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'schoolyear/:action', component: SchoolYearComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'role', component: RoleComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'role/:action', component: RoleComponent , canActivate: [CanActivateAuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [CanActivateAuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}