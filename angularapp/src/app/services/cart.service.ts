import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl=apiUrl;
  
  constructor(private httpClient: HttpClient) { }
  private products : Cart[] = [];
  public cart : Cart;

  public addToCart(userId,productId,quantity,cart) : Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/cart/"+userId+"/"+productId+"/"+quantity,cart);
  }

  // public removeFromCart(productId : number) : void{
  //   this.products = this.products.filter(c => c.productId != productId);
  // }

  public getCartItems() : void{ 
    this.products.map(c =>({ product : c.product ,quantity : c.quantity }));
  } 

  public clearCart() : void{
    this.products = [];
  }
}
