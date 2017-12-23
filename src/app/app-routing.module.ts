import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { UserComponent }   from './user/user.component';
import { HomeComponent }   from './home/home.component';
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

import { CanActivateAuthGuard } from './login/can-activate.authguard';

const routes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: '',  component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: '', component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'home',  component: HomeComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'signup', component: UserComponent, canActivate: [CanActivateAuthGuard] },
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
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}