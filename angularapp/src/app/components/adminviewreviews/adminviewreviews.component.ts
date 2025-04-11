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
  searchData:string="";
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
  review:Review={
    reviewText: '',
    rating: 0,
    date: '',
    user: new User,
    product: undefined
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
    this.productService.getProductById(productId).subscribe(data=>{
      this.product = data;
      this.showProductDetails = !(this.showProductDetails);
    })
  }
  viewProfile(reviewId:number){
    this.reviewService.getReviewById(reviewId).subscribe(data=>{
      this.review = data;
      this.showUserDetails = !(this.showUserDetails);
    })  
  }

}

