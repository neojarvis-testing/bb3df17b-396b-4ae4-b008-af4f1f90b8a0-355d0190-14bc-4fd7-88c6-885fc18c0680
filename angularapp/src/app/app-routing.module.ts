import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { LoginComponent } from './components/login/login.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { MyreviewComponent } from './components/myreview/myreview.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'user-view-products', component: UserviewproductComponent },
  { path: 'my-order', component: MyorderComponent },
  { path: 'my-review', component: MyreviewComponent },
  // { path: 'cart', component: CartComponent },
  { path: 'order-placed', component: OrderplacedComponent },
  { path: 'admin-view-reviews', component: AdminviewreviewsComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'admin-view-products', component: AdminviewproductComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
