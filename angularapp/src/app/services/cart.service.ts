import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/url';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = apiUrl;

  constructor(private httpClient: HttpClient) { }
  private products: Cart[] = [];
  public cart: Cart;

  public addToCart(userId: number, productId: number, quantity: number, cart: Cart): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/api/cart/add/" + userId + "/" + productId + "/" + quantity, cart);
  }

  public getCart(userId: number): Observable<Cart> {
    console.log(userId);

    return this.httpClient.get<Cart>(apiUrl + "/api/cart/" + userId);
  }

  public clearCart(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/cart/clear/${userId}`);
  }

  
}
