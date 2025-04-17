import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/url';
import { Wishlist } from '../models/wishlist.model';
import { Observable } from 'rxjs';
import { WishlistItem } from '../models/wishlist-item.model';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  apiUrl = apiUrl;

  constructor(private httpClient: HttpClient) { }
  private products: Wishlist[] = [];
  public wishlist : Wishlist;

  public addToWishlist(userId: number, productId: number, quantity: number, wishlist: Wishlist): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/api/wishlist/add/" + userId + "/" + productId + "/" + quantity, wishlist);
  }

  public getWishlist(userId: number): Observable<Wishlist> {
    return this.httpClient.get<Wishlist>(apiUrl + "/api/wishlist/" + userId);
  }

  public clearWishlist(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/wishlist/clear/${userId}`);
  }

  public updateWishlistItem(userId: number, wishlistItem : WishlistItem) {
    if (!wishlistItem.product.productId || wishlistItem.quantity === undefined) {
      console.error("Invalid Wishlist item data:", wishlistItem);
      return;
    }
    return this.httpClient.put(`${apiUrl}/api/wishlist/updateItem/${userId}/${wishlistItem.product.productId}/${wishlistItem.quantity}`, {});
  }

  public removeFromWishlist(userId: number, productId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/wishlist/remove?userId=${userId}&productId=${productId}`);
  }
  
}
