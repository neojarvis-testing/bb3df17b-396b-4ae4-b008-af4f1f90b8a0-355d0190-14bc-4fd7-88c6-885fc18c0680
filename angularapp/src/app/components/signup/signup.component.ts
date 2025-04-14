import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { apiUrl } from 'src/url';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username:string="";
  mobile:string="";
  email : string = "";
  password : string = "";
  role : string = "";
  confirmPassword:string="";
  otp : string = "";
  otpSent = false;
  otpVerified = false;
  user = { username: '', email: '', phone: '', password: '', role: 'USER' || 'ADMIN', otpV : this.otpVerified }

  constructor(private authService:AuthService,private router:Router, private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  // public register(registerForm:NgForm) {
  //   if(registerForm.valid) {
  //   let user = {username:this.username,mobileNumber:this.mobile,email:this.email,password:this.password,userRole:this.role}
  //   console.log(user);
    
  

  //   this.router.navigate(['/login'])
  //   }
  // }

  
// public register(registerForm: NgForm): void {
//   if (registerForm.valid) {
//     let user:User = {
//       username: this.username,
//       mobileNumber: this.mobile,
//       email: this.email,
//       password: this.password,
//       userRole: this.role
//     };
      
//     this.authService.register(user).subscribe(
//       response => {
//         console.log('Registration successful', response);
//         this.router.navigate(['/login']);
//       },
//       error => {
//         console.error('Registration failed', error);
//       });
//     }
//   }

public register(registerForm: NgForm): void {
  if (!this.otpVerified) {
    alert('Please verify OTP before proceeding!');
    return; // Prevent registration if OTP is not verified
  }

  if (registerForm.valid) {
    let user: User = {
      username: this.username,
      mobileNumber: this.mobile,
      email: this.email,
      password: this.password,
      userRole: this.role
    };

    this.authService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}

  public sendOTP() {
    if (!this.email) return;
    this.httpClient.post(apiUrl+'/api/otp/send', null, {
      params: { email: this.email }
    }).subscribe(() => {
      this.otpSent = true;
      alert('OTP sent to email!');
    });
  }

  public verifyOTP() {
    console.log(this.otp);
    this.httpClient.post<boolean>(apiUrl+'/api/otp/verify', null, {
      params: { email: this.email, otp: this.otp }
      
    }).subscribe(result => {
      if (result) {
        this.otpVerified = true;
        alert('OTP Verified! You can register now.');
      } else {
        alert('Invalid OTP');
      }
    });
  }

  // onSubmit() {
  //   if (!this.otpVerified) {
  //     alert('Please verify OTP first!');
  //     return;
  //   }
  //   // Call actual registration endpoint here
  //   this.httpClient.post(apiUrl+'/api/users/register', this.user)
  //     .subscribe(() => alert('Registration successful!'));
  // }
}