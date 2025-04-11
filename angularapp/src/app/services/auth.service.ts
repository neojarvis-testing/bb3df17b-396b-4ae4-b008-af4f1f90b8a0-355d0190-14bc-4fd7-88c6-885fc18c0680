import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators'
import { User } from '../models/user.model';
import { apiUrl } from 'src/url';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl=apiUrl;

  constructor(private httpClient:HttpClient, private router : Router) { }
  
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

//   public login(login : LoginComponent) {
//     this.httpClient.post<{ token: string; userRole: string }>(`${this.baseUrl}/api/login`, login).subscribe(
//         response => {
//             const { token, userRole } = response;
 
//             // Store token and role in localStorage
//             localStorage.setItem('token', token);
//             localStorage.setItem('userRole', userRole);
 
//             // Navigate based on user role
//             if (userRole == 'ADMIN') {
//                 this.router.navigate(['/adminNav']); // Navigate to adminnavbar
//             } else if (userRole == 'USER') {
//                 this.router.navigate(['/userNav']); // Navigate to usernavbar
//             }
//         },
//         error => {
//             console.error('Login failed', error);
//         }
//     );
// }

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
