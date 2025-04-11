import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {
  reviews:Review[] = [];
  constructor(private reviewService:ReviewService) { }
  ngOnInit(): void {
    
  }
  

}
