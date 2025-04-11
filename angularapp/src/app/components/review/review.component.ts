import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
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
  stars: boolean[] = [false, false, false, false, false];
  
  
rate(rating: number) {
  this.review.rating = rating;
  this.stars = this.stars.map((_, index) => index < rating);

  }
  
  
  constructor(private reviewService :ReviewService,private router:Router) { }

  ngOnInit(): void {
    
  }
  submitReview(){
    this.reviewService.addReview(this.review).subscribe(data=>{
      console.log("Componenet"+this.review);
      this.router.navigate(['/home-page'])
    })
  }
}
