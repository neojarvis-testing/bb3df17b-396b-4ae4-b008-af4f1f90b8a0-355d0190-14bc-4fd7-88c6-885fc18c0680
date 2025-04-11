import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
 
  review:Review = {
    reviewText: "", rating: 0, date: "",
    user: new User,
    product: undefined
  }
  productId:number;
  stars: boolean[] = [false, false, false, false, false];
  
  
rate(rating: number) {
  this.review.rating = rating;
  this.stars = this.stars.map((_, index) => index < rating);

  }
  
  
  constructor(private reviewService :ReviewService,private router:Router,private activatedRoute:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
       
  }
  submitReview(){
    this.reviewService.addReview(this.review).subscribe(data=>{
      console.log("Componenet"+this.review);
      this.router.navigate(['/home-page'])
    })
  }
}
