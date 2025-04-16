import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {
  reviews:Review[] = [];
  product:Product ={
    productName: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: '',
    brand: '',
    coverImage: ''
  }
    
  stars: boolean[] = [false, false, false, false, false];
  showProductDetails = false; 
  currentUser:any;
  showDeleteConfirmation: boolean = false;
  reviewIdToDelete: number | null = null;
  private subscription:Subscription;

  constructor(private reviewService:ReviewService,private productService:ProductService,private userStore:UserStoreService) { }
    
  ngOnInit(): void {
    this.currentUser = parseInt(this.userStore.authUser.userId);
    this.getAllReviewsByUserId();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  getAllReviewsByUserId(){
    this.subscription=this.reviewService.getReviewsByUserId(this.currentUser).subscribe(data=>{
    this.reviews = data;
    })
  }
  
  viewProduct(productId:number){
    this.subscription=this.productService.getProductById(productId).subscribe(data=>{
    this.product = data;
    this.showProductDetails = !(this.showProductDetails);
    })
  }

  deleteReview(reviewId:number){
    this.showDeleteConfirmation = true;
    this.reviewIdToDelete = reviewId;
    // this.subscription=this.reviewService.deleteReview(reviewId).subscribe(data=>{
    // this.getAllReviewsByUserId();
    // })
  }

  closePopup() {
    this.showProductDetails = false; // Hide the popup
  }




confirmDelete() {
  if (this.reviewIdToDelete !== null) {
    this.subscription = this.reviewService.deleteReview(this.reviewIdToDelete).subscribe(data => {
      this.getAllReviewsByUserId();
      this.showDeleteConfirmation = false;
      this.reviewIdToDelete = null;
    });
  }
}

cancelDelete() {
  this.showDeleteConfirmation = false;
  this.reviewIdToDelete = null;
}


}