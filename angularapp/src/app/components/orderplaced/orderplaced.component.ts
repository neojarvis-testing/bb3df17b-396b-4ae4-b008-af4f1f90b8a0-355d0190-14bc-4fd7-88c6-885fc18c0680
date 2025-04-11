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
  searchId : number ;
  

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(){
    this.orderService.getAllOrders().subscribe(data=>{
      this.orders = data;
    })
  }

 

  public searchOrder() {
    this.orderService.getAllOrders().subscribe(data=>{
      this.orders = data;
      if (!this.searchId) {
        this.getAllOrders(); // Reloads all orders when search field is empty
    } else {
        this.orders = this.orders.filter(o => o.orderId == this.searchId);
    }
    })
  }

    public sortOrders() {
      this.orders.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    }

  // public viewIterms(){

  // }

  // public viewProfile(){
  //   //this.router.navigate(['/api/'])
  // }

  



}
  


