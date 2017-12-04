import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { UserComponent }   from './user/user.component';
import { HomeComponent }   from './home/home.component';
import { UserComponent }   from './user/user.component';
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

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'signup', component: UserComponent },
  { path: 'feeCategory/:feeId', component: FeeCategoryComponent },
  { path: 'feeParticular/:feeId', component: FeeParticularComponent },
  { path: 'feeParticular/edit/:particualrId', component: FeeParticularComponent },
  { path: 'feeList/:id', component: FeeListComponent },
  { path: 'particularList/:feeId/:batchId', component: FeeParticularListComponent },
  { path: 'feeView/:feeId/:batchId', component: FeeViewComponent },
  { path: 'discount/category/:discountCategoryId', component: DiscountCategoryComponent },
  { path: 'discount/categorylist', component: DiscountCategoryListComponent },
  { path: 'discount/:discountId', component: DiscountComponent },
  { path: 'discount', component: DiscountListComponent },
  { path: 'fine', component: FineComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}