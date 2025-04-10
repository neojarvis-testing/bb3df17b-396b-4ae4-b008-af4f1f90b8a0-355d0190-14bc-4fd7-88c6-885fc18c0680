import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  public register(registerForm:NgForm) {
    if(registerForm.valid) {
    let user = {username:this.username,mobileNumber:this.mobile,email:this.email,password:this.password,userRole:this.role}
    console.log(user);
    
    let registerUser = this.authService.register(this.username,this.password,this.role);
    console.log(registerUser);
    }
  }

}
