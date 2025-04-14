import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminviewproductComponent,
    AdminviewreviewsComponent,
    CheckoutComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    MyorderComponent,
    MyreviewComponent,
    OrderplacedComponent,
    ProductCreateComponent,
    ReviewComponent,
    SignupComponent,
    UsernavComponent,
    UserviewproductComponent,
    AdminnavComponent,
    SearchPipe,
    AddToCartComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
