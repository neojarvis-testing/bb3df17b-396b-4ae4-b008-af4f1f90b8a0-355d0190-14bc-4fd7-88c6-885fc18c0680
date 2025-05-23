import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = apiUrl;

  constructor(private httpClient:HttpClient) { }
  
  addReview(review:Review):Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/reviews",review);
  }
  
  getReviewById(reviewId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/reviews/"+reviewId);
  }
  
  getAllReviews():Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/reviews");
  }
  
  getReviewsByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/reviews/user/"+userId);
  }
  
  getReviewsByProductId(productId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/reviews/product/"+productId);
  }

  deleteReview(reviewId:number):Observable<any>{
  return this.httpClient.delete(this.baseUrl+"/api/reviews/"+reviewId);
  }
}