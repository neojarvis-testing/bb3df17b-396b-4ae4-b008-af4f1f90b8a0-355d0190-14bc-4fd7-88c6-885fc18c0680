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
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserAuthGuard } from './user-auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'home-page',component:HomePageComponent},
  {path:'cart',component:AddToCartComponent, canActivate: [UserAuthGuard]},
  {path:'admin-nav',component:AdminnavComponent, canActivate: [AdminAuthGuard]},
  {path:'admin-view-product',component:AdminviewproductComponent, canActivate: [AdminAuthGuard]},
  {path:'admin-view-reviews',component:AdminviewreviewsComponent, canActivate: [AdminAuthGuard]},
  // {path:'check-out/${cartData}',component:CheckoutComponent},
  {path:'error',component:ErrorComponent},
  {path:'login',component:LoginComponent},
  {path:'my-order/:id',component:MyorderComponent, canActivate: [UserAuthGuard]},
  {path:'my-review',component:MyreviewComponent, canActivate: [UserAuthGuard]},
  {path:'order-placed',component:OrderplacedComponent, canActivate: [AdminAuthGuard]},
  {path:'product-create',component:ProductCreateComponent, canActivate: [AdminAuthGuard]},
  {path:'edit-product/:id',component:ProductCreateComponent, canActivate: [AdminAuthGuard]},
  {path:'review/:id',component:ReviewComponent, canActivate: [UserAuthGuard]},
  {path:'sign-up',component:SignupComponent},
  {path:'user-nav',component:UsernavComponent, canActivate: [UserAuthGuard]},
  {path:'user-view-product',component:UserviewproductComponent},
  {path:'change-password',component:ChangePasswordComponent},
  { path: 'check-out', component: CheckoutComponent },
  {path: 'wishlist', component: WishlistComponent},
  {path:'**',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
 