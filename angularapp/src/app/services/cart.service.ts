import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl:string="";
  
  constructor(private httpClient : HttpClient) { }
  

  public addToCart(product : Product, quantity : number) : Observable<any>{
    
  }

  public removeFromCart(productId : number) : Observable<any>{
    return null;
  }

  public getCartItems(OrderItem : any[]) : Observable<any>{
    return null;
  } 

  public clearCart() : Observable<any>{
    return null;
  }
}
