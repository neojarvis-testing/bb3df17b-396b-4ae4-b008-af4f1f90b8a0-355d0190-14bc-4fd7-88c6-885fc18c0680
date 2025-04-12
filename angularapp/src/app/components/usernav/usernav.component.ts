import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  userId : number = parseInt(localStorage.getItem('userId'));
  username : string = localStorage.getItem('username');
  
  constructor(private authService : AuthService) { }


  ngOnInit(): void {
  }

  public logout() : void{
    this.authService.logout();
  }

}
