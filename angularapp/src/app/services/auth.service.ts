import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://ide-fabeeeeabaaadadafbbadbcfdcfcc.premiumproject.examly.io/proxy/8080";

  constructor(private httpClient:HttpClient, private router : Router) { }
  
  public getUserById(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/register/"+userId);
  }
  
  public register(user:User):Observable<any> {
     return this.httpClient.post(this.baseUrl+"/api/register", user);
  }

  public login(login : Login) {
    this.httpClient.post<{ token: string; role: string }>(`${this.baseUrl}/api/login`, login).subscribe(
        response => {
            const { token, role } = response;
 
            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
 
            // Navigate based on user role
            if (role == 'ADMIN') {
                console.log("admin")
                this.router.navigate(['/admin-nav']); // Navigate to adminnavbar
            } else if (role == 'USER') {
              console.log("user")
                this.router.navigate(['/user-nav']); // Navigate to usernavbar
            }
        },
        error => {
            console.error('Login failed', error);
        }
    );
}

  public isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }
  public logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  public isAdmin():boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  public isUser():boolean {
    return localStorage.getItem('role') === 'USER';
  } 
}
