import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {

  orders : Order[] = [];
  
  

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(){
    this.orderService.getAllOrders().subscribe(data=>{
      this.orders = data;
    })
  }

  

  // public viewIterms(){

  // }

  // public viewProfile(){
  //   //this.router.navigate(['/api/'])
  // }

  



}
  


