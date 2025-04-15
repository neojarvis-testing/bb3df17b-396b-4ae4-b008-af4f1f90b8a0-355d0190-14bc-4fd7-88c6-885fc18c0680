import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

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
