import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
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
  constructor(private reviewService :ReviewService,private router :Router,private activateRoute:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.getAllReviews();
    this.productId =  parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    })
  }
  getAllReviews(){
    this.reviewService.getAllReviews().subscribe(data=>{
      this.reviews = data;
    })
  }

}

