import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string='https://ide-fadeafcbaeefadadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080';

  constructor(private httpClient: HttpClient) { }

  placeOrder(order:Order): Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/orders",order);
  }

  getOrderById(orderId: number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/orders/"+orderId);
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/orders");
  }
  
  getOrdersByUserId(userId : number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/orders/user/"+userId);
  }

  updateOrder(orderId:number, order:Order):Observable<any>{
    return this.httpClient.put(this.apiUrl+"/api/orders/"+orderId,order);
  }

  deleteOrder(orderId: number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/orders/"+orderId);
  }

  
  
  
}
