import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products:Product[]=[];
  reviews:Review[]=[];
 productname:string;
  constructor(private productService:ProductService,private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    })
  }
  viewReview(productId:number){
    this.reviewService.getReviewsByProductId(productId).subscribe(data=>{
        this.reviews = data;
        
    })
  }

}
