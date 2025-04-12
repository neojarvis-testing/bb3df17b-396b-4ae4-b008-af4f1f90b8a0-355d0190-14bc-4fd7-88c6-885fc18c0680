  import { Component, OnInit } from '@angular/core';
  import { Product } from 'src/app/models/product.model';
  import { Review } from 'src/app/models/review.model';
  import { ProductService } from 'src/app/services/product.service';
  import { ReviewService } from 'src/app/services/review.service';

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
    constructor(private reviewService:ReviewService,private productService:ProductService) { }
    ngOnInit(): void {
      this.getAllReviewsByUserId();
    }
    getAllReviewsByUserId(){
      this.reviewService.getReviewsByUserId(1).subscribe(data=>{
        this.reviews = data;
      })
    }
  
    viewProduct(productId:number){
      this.productService.getProductById(productId).subscribe(data=>{
        this.product = data;
        this.showProductDetails = !(this.showProductDetails);
      })
    }
    deleteReview(reviewId:number){
        this.reviewService.deleteReview(reviewId).subscribe(data=>{
          this.getAllReviewsByUserId();
        })
    }
    closePopup() {
      this.showProductDetails = false; // Hide the popup
    }

  }
