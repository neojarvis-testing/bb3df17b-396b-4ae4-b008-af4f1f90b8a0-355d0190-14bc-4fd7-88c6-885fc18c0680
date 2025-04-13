import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems:CartItem[] = [];

  constructor(private cartService:CartService,private route:ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const rawCartData = params.get('cartData');
      this.cartItems = JSON.parse(decodeURIComponent(rawCartData));
      console.log(this.cartItems);
      
    });
    console.log(this.cartItems);
  }
  
  
  

}
