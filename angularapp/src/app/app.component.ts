import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    console.log('User Role:', localStorage.getItem('userRole')); 
  }

  
  public isAdmin(): boolean {
     return localStorage.getItem('userRole') === 'ADMIN';
    }
  
  public isUser(): boolean {
    return localStorage.getItem('userRole') === 'USER';
  }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }
  
  title = 'angularapp';
}
