import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  // public register(registerForm:NgForm) {
  //   if(registerForm.valid) {
  //   let user = {username:this.username,mobileNumber:this.mobile,email:this.email,password:this.password,userRole:this.role}
  //   console.log(user);
    
  

  //   this.router.navigate(['/login'])
  //   }
  // }

  
public register(registerForm: NgForm): void {
  if (registerForm.valid) {
    let user:User = {
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
      });
    }
  }
}
