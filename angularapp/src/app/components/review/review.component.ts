import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  review: Review = {
    reviewText: "", rating: 0, date: "",
    user: new User,
    product: undefined
  }
  currentUser:any;
  productId: number;
  stars: boolean[] = [false, false, false, false, false];


  rate(rating: number) {
    this.review.rating = rating;
    this.stars = this.stars.map((_, index) => index < rating);

  }


  constructor(private reviewService: ReviewService, private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService,private userStore:UserStoreService) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentUser = parseInt(this.userStore.authUser.userId);
    console.log(this.currentUser,"current user-id");
    this.review.user.userId = this.currentUser; //modification done
    this.productService.getProductById(this.productId).subscribe(product => {
      this.review.product = product;
    });
  }
  submitReview() {
    this.reviewService.addReview(this.review).subscribe(data => {
      console.log("Componenet" + this.review);
      this.router.navigate(['/user-view-product'])
    })
  }
}
