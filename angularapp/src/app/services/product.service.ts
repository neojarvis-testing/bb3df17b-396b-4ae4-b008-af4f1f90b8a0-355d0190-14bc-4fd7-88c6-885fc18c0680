import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  apiUrl: string='https://ide-fdebbcdaafdadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080';

  constructor(private httpClient: HttpClient) { }

  getAllProducts():Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/products");
  }

  getProductById(productId : number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/api/products/"+productId);
  }

  addProduct(product: Product):Observable<any>{
    return this.httpClient.post(this.apiUrl+"/api/products",product);
  }

  updateProduct(product: Product, productId : number):Observable<any>{
    return this.httpClient.put(this.apiUrl+"/api/products/"+productId,product);
  }

  deleteProduct(productId : number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/products/"+productId);
  }
}
