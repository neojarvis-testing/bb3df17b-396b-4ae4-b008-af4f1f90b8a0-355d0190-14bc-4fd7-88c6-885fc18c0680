import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  userId : number = parseInt(localStorage.getItem('userId'));
  username : string = localStorage.getItem('username');
  popupVisible: boolean = false;
  
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public confirmLogout(): void {
    this.popupVisible = true; // Show the confirmation pop-up
  }
  
  public cancelLogout(): void {
    this.popupVisible = false; // Hide the confirmation pop-up
  }
  
  public logoutConfirmed(): void {
    this.authService.logout(); // Perform the logout action
    this.popupVisible = false; // Hide the confirmation pop-up
  }

}
