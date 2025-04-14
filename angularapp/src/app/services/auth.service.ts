import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { User } from '../models/user.model';
import { Login } from '../models/login.model'
import { apiUrl } from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl=apiUrl;

  constructor(private httpClient:HttpClient, private router : Router) { }
  
  public getUserById(userId:number):Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/user/"+userId);
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

  public login(login : Login) {
    this.httpClient.post<{ token: string; email : string, role: string, userId : string, username : string }>(`${this.baseUrl}/api/login`, login).subscribe(
        response => {
            const { token, email, role, userId, username } = response;

            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('userRole', role);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId.toString());
 
            // Navigate based on user role
            if (role == 'ADMIN') {
                console.log("admin")
                this.router.navigate(['/home-page']); // Navigate to adminnavbar
                // window.location.href = '/admin-nav';
            } else if (role == 'USER') {
              console.log("user")
              // window.location.href = '/user-nav';
                this.router.navigate(['/home-page']); // Navigate to usernavbar
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
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  public isAdmin():boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  public isUser():boolean {
    return localStorage.getItem('role') === 'USER';
  } 
}
