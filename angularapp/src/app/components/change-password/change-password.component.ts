  import { Component, OnInit } from '@angular/core';
  import { User } from 'src/app/models/user.model';
  import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
  })
  export class ChangePasswordComponent implements OnInit {

    user:User = {email:"",password:"",username:"",userRole:"",mobileNumber:""}
    oldDbPass:string="";
    oldInpPass:string="";
    newPass:string="";
    newConfirmPass:string="";

    constructor(private authService:AuthService) { }

    ngOnInit(): void {
      this.authService.getUserById(parseInt(localStorage.getItem('userId'))).subscribe(data => {
        this.user = data;
        this.oldDbPass = this.user.password;
        console.log(this.oldDbPass);
      });
    }
    public changePassword() {

    }

  }
