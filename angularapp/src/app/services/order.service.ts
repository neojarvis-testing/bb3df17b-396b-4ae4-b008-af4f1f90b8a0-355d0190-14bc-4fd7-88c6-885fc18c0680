import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl=apiUrl;

  constructor(private httpClient: HttpClient) { }

  placeOrder(order:Order): Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/orders",order);
  }

  getOrderById(orderId: number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/orders/"+orderId);
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/orders");
  }
  
  getOrdersByUserId(userId : number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/orders/user/"+userId);
  }

  updateOrder(orderId:number, order:Order):Observable<any>{
    return this.httpClient.put(this.baseUrl+"/api/orders/"+orderId,order);
  }

  deleteOrder(orderId: number):Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/api/orders/"+orderId);
  }

  
  
  
}
