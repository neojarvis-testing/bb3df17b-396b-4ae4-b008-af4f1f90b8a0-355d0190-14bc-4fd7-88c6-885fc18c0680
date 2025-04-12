import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  userId:number;
  cartItems:CartItem;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  addToCart(){
    let productId = this.cartItems.product.productId;
    let qty = this.cartItems.quantity;

    this.cartService.addToCart(this.userId,productId,qty,null);
  }


}
