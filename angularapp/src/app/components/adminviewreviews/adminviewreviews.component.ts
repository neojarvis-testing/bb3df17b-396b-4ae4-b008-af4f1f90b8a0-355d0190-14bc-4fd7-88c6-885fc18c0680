import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminviewreviewsComponent implements OnInit {
  reviews:Review [] =[];
  product :Product = {
    productName: "", price: 0, category: "", brand: "", description: "",
    stockQuantity: 0,
    coverImage: ''
  };
  productId:number;
  user:User = {
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: ''
  }
  showProductDetails:boolean = false;
  showUserDetails:boolean = false;
  constructor(private reviewService :ReviewService,private router :Router,private activateRoute:ActivatedRoute,private productService:ProductService,private authService:AuthService) { }

  ngOnInit(){
    this.getAllReviews();
  }
  getAllReviews(){
    this.reviewService.getAllReviews().subscribe(data=>{
      this.reviews = data;
    })
  }
  viewProduct(productId:number){
    
    console.log(productId);
    this.productService.getProductById(productId).subscribe(data=>{
      this.product = data;
      this.showProductDetails = true;
    })
  }
  viewProfile(userId:number){
    this.authService.getUserById(userId).subscribe(data=>{
      console.log(data);
      this.showUserDetails = true;
    })
  }

}

