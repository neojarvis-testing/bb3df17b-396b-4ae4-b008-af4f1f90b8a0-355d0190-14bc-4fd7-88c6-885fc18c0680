import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
// import { log } from 'console';

declare var bootstrap: any; // Ensure Bootstrap modal works

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User = { email: "", password: "", username: "", userRole: "", mobileNumber: "" };
  oldDbPass: string = "";
  oldInpPass: string = "";
  newPass: string = "";
  newConfirmPass:string="";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserById(parseInt(localStorage.getItem('userId') || '0')).subscribe(data => {
      this.user = data;
      this.oldDbPass = this.user.password;
    });

    // Open modal automatically when the component loads
    this.openModal();
  }

  openModal() {
    const modalElement = document.getElementById('passwordModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('passwordModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  public changePassword(): void {
    if (this.oldInpPass === this.oldDbPass) {
      if (this.newPass === this.newConfirmPass) {
        // this.authService.updateUser(parseInt(localStorage.getItem('userId') || '0'), this.newPass).subscribe(
        //   response => {
        //     console.log("Password changed successfully.");
        //     this.errorMessage = "Password changed successfully.";
        //     this.closeModal();
        //   },
        //   error => {
        //     console.error("Error changing password:", error);
        //     this.errorMessage = "Error updating password. Please try again.";
        //   }
        // );
      } else {
        this.errorMessage = "New password and confirmation password do not match.";
      }
    } else {
      this.errorMessage = "Old password is incorrect.";
    }
  }
  
  
  
}
