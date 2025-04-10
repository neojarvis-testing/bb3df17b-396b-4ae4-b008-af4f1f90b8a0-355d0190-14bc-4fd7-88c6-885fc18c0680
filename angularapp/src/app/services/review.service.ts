import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl:string="https://ide-cdeacfbeedaedadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080/api/reviews";

  constructor(private httpClient:HttpClient) { }
  addReview(review:Review):Observable<any>{
    return this.httpClient.post(this.baseUrl,review);
  }
  getReviewById(reviewId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/"+reviewId);
  }
  getAllReviews():Observable<any>{
    return this.httpClient.get(this.baseUrl);
  }
  getReviewsByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/user/"+userId);
  }
  getReviewsByProductId(productId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/product/"+productId);
  }

  deleteReview(reviewId:number):Observable<any>{
  return this.httpClient.delete(this.baseUrl+"/"+reviewId);
  }

}

