import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  email : string = "";
  password : string = "";
  role : string = "";
  ngOnInit(): void {
  }

  public login() : void{
    let loginuser={email : this.email, password: this.password, role: this.role};
    let isloginuser=this.authService.login(this.email,this.password,this.role);
    if(isloginuser){
      const role=loginuser.role;
      if(role){
        if(role==='ADMIN'){
          this.router.navigate(['/admin']);
        }
        else if(role === 'USER'){
          this.router.navigate(['/user']);
        }else{}
      }else{}
    }
  }


}
