import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor() { }
  private products : Cart[] = [];
  public cart : Cart;

  public addToCart(product : Product, quantity : number) : void{
    this.cart.product = product;
    this.cart.quantity = quantity;
    let existingProduct = this.products.find(i => i.productId == this.cart.productId);
    if(existingProduct){
      existingProduct.quantity += this.cart.quantity;
    } else {
      this.products.push(this.cart);
    }
  }

  public removeFromCart(productId : number) : void{
    this.products = this.products.filter(c => c.productId != productId);
  }

  public getCartItems() : void{ 
    this.products.map(c =>({ product : c.product ,quantity : c.quantity }));
  } 

  public clearCart() : void{
    this.products = [];
  }
}
