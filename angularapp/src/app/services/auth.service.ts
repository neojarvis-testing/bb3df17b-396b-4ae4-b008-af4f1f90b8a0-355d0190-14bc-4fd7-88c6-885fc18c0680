import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="";

  constructor(private httpClient:HttpClient) { }

  public register(user:User):Observable<any> {
    return this.httpClient.post(this.baseUrl,user);
  }


}
