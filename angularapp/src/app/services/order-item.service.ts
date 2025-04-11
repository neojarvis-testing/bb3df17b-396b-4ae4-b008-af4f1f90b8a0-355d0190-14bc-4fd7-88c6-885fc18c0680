import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  baseUrl=apiUrl; 

  constructor(private httpClient: HttpClient) { }

  getOrderItems(orderId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/api/order-items/"+orderId);
  }
}
