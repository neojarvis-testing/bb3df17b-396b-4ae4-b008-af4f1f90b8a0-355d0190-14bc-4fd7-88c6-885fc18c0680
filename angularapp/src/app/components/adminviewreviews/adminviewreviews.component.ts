import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  
  reviews: Review[] = [];
  searchData: string = "";
  product: Product = {
    productName: "", price: 0, category: "", brand: "", description: "",
    stockQuantity: 0,
    coverImage: ''
  };
  productId: number;
  user: User = {
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: ''
  }
  review: Review = {
    reviewText: '',
    rating: 0,
    date: '',
    user: new User,
    product: undefined
  }
  showProductDetails: boolean = false;
  showUserDetails: boolean = false;
  private subscription:Subscription

  constructor(private reviewService: ReviewService, private productService: ProductService) { }

  ngOnInit() {
    this.getAllReviews();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  getAllReviews() {
    this.subscription=this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data;
    })
  }
  viewProduct(productId: number) {
    this.subscription=this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      this.showProductDetails = !(this.showProductDetails);

      this.showPopup('productPopup');

    })

  }
  viewProfile(reviewId: number) {
    this.subscription=this.reviewService.getReviewById(reviewId).subscribe(data => {
      this.review = data;
      this.showUserDetails = !(this.showUserDetails);
    })

    this.showPopup('userPopup');

  }

  showPopup(popupId: string) {
    document.getElementById(popupId).classList.add('active');
    document.getElementById(popupId + 'Overlay').classList.add('active');
  }

  closePopup(popupId: string) {
    document.getElementById(popupId).classList.remove('active');
    document.getElementById(popupId + 'Overlay').classList.remove('active');
  }
}

