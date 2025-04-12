import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isAdmin() : boolean{
    return localStorage.getItem('userRole') === 'ADMIN';
  }

  isUser() : boolean{
    return localStorage.getItem('userRole') === 'USER';
  }

}
