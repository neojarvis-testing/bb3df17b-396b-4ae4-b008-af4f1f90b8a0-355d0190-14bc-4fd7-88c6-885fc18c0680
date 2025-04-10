import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://ide-fdebbcdaafdadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080";

  constructor(private httpClient:HttpClient) { }

  public register(user:User):Observable<any> {
    console.log("+++++++++++",user);
      if()
     return this.httpClient.post<any>(`${this.baseUrl}/api/register`, user);

  }

  public login(username:string,password:string,role:string):Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/login`,{username,password,role})
  }

  public isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }
  public logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // this.router.navigate(['/login']);
  }

  public isAdmin():boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  public isUser():boolean {
    return localStorage.getItem('role') === 'USER';
  }
 
}
