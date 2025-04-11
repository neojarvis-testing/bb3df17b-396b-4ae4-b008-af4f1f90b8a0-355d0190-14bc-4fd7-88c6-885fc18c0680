import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  userId:number
  productId:number

  constructor(private cartService:CartService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId=parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.productId=parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  addToCart(){
    this.cartService.addToCart(this.userId,this.productId).subscribe(data=>{
      
    })
  }


}
