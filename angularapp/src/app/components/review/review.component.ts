import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductLauncher } from 'puppeteer';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews:Review [] =[];
  constructor(private reviewService :ReviewService) { }

  ngOnInit(): void {
    this.getAllReviews();
  }
  getAllReviews(){
    this.reviewService.getAllReviews().subscribe(data=>{
      this.reviews = data;
    })
  }

}
