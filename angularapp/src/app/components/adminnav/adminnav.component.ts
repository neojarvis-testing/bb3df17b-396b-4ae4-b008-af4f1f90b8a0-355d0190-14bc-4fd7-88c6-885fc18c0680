import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  username : string = localStorage.getItem('username');
  
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  public logout() : void{
    this.authService.logout();
  }

}
