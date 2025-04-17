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
    if (this.newPass !== this.newConfirmPass) {
      this.errorMessage = "Passwords do not match!";
      return;
    }
  
    this.authService.changePassword(parseInt(localStorage.getItem('userId') || '0'), this.oldInpPass, this.newPass)
      .subscribe(response => {        
        this.closeModal();
        this.router.navigate(['/**']);
        alert('Password changed successfully!');
      }, error => {
        if (error.status === 401) { // Unauthorized response
          this.errorMessage = "Old password is incorrect!";
        } else {
          this.errorMessage = "";
          alert('Password changed successfully!');
          this.closeModal();
          this.router.navigate(['/**']);
        }
      });
  }

  
  
}
