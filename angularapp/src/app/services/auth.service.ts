import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { User } from '../models/user.model';
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl=apiUrl;

  constructor(private httpClient:HttpClient) { }
  
  public getUserById(userId:number):Observable<any>{
    
    return this.httpClient.get(this.baseUrl+"/api/register/"+userId);
  }
  
  public register(user:User):Observable<any> {
    console.log("Service:" + JSON.stringify(user));
     return this.httpClient.post<any>(`${this.baseUrl}/api/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
     
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
