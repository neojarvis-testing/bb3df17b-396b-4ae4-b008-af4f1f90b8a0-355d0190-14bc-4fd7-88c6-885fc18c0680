import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl:string="https://ide-aadbcaebbcafddadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080"
  
  constructor(private httpClient: HttpClient) { }
  private products : Cart[] = [];
  public cart : Cart;

  public addToCart(userId,productId) : Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/cart/",userId,productId);
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
