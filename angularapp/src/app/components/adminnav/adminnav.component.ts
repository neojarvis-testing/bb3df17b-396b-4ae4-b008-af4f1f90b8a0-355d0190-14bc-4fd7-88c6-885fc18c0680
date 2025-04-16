import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  userId: number = parseInt(localStorage.getItem('userId')!);
  username: string = localStorage.getItem('username')!;
  popupVisible: boolean = false;
  userDetailsPopupVisible: boolean = false;
  user: any = {};

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    })
  }

  public confirmLogout(): void {
  this.popupVisible = true;
}

public cancelLogout(): void {
  this.popupVisible = false;
}

public logoutConfirmed(): void {
  this.authService.logout();
  this.popupVisible = false;
}

public showUserDetails(): void {
  this.userDetailsPopupVisible = true;
}

public closeUserDetails(): void {
  this.userDetailsPopupVisible = false;
}

public resetPassword(): void {
  console.log('Redirecting to reset password...');
}

}
