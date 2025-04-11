import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl=apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllProducts():Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products");
  }

  getProductById(productId : number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products/"+productId);
  }

  addProduct(product: Product):Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/products",product);
  }

  updateProduct(productId : number,product: Product,):Observable<any>{
    return this.httpClient.put(this.baseUrl+"/api/products/"+productId,product);
  }

  deleteProduct(productId : number):Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/api/products/"+productId);
  }
}
