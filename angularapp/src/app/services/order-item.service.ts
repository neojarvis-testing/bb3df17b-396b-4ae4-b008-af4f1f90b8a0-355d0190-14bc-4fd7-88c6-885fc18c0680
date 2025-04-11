import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  apiUrl: string=''; 

  constructor(private httpClient: HttpClient) { }

  getOrderItems(orderId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl+"/api/order-items/"+orderId);
  }
}
