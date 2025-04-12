import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';

const routes: Routes = [
  {path:'home-page',component:HomePageComponent},
  {path:'cart/:userId/:productId',component:AddToCartComponent},
  {path:'admin-nav',component:AdminnavComponent},
  {path:'admin-view-product',component:AdminviewproductComponent},
  {path:'admin-view-reviews',component:AdminviewreviewsComponent},
  {path:'check-out',component:CheckoutComponent},
  {path:'error',component:ErrorComponent},
  {path:'login',component:LoginComponent},
  {path:'my-order/:id',component:MyorderComponent},
  {path:'my-review',component:MyreviewComponent},
  {path:'order-placed',component:OrderplacedComponent},
  {path:'product-create',component:ProductCreateComponent},
  {path:'edit-product/:id',component:ProductCreateComponent},
  {path:'review/:id',component:ReviewComponent},
  {path:'sign-up',component:SignupComponent},
  {path:'user-nav',component:UsernavComponent},
  {path:'user-view-product',component:UserviewproductComponent},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
