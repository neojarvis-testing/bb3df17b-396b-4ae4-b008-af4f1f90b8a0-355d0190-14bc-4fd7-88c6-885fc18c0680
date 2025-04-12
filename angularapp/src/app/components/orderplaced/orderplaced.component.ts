import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {

  orders : Order[] = [];
  orderStatus : string[] = ["Pending","Accepted","Dispatched","Out For Delivery","Delivered"]
  searchId : number ;
  selectedUser : User ;
  // user1: User = {
  //   email: 'ab@gmail.com',
  //   password: 'Raj@123',
  //   username: 'ab23',
  //   mobileNumber: '1234567890',
  //   userRole: 'admin'
  // }
  // selectedOrderItems1 : any[] = [
  //   {
  //     quantity : 2 , price : 200
  //   },
  //   {
  //     quantity : 4 , price : 400
  //   },
  // ]

  //userId : number;
  selectedOrderItems: OrderItem[] = [];
  // showModal: boolean = false;

  constructor(private orderService : OrderService , private orderItemService : OrderItemService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(){
    this.orderService.getAllOrders().subscribe(data=>{
      console.log(data)
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


    public viewProfile(user: User): void {
      // console.log(this.user1)
      this.selectedUser = user;
    }
   
    public closeProfile(): void {
      this.selectedUser = null;
    }

    public getOrderItemByOrderId(orderId:number){
      this.orderItemService.getOrderItems(orderId).subscribe(data=>{
      this.selectedOrderItems = data;
      })
    }

  //   public getAllOrdersByUserId(): void {
  //     this.orderService.getOrdersByUserId(this.userId).subscribe(data => {
  //       this.orders = data;
  //     });
  //   }
   
  //   public viewItems(orderId: number): void {
  //     this.orderItemService.getOrderItems(orderId).subscribe({
  //         next: items => {
  //             console.log(this.selectedOrderItems1);
  //             this.selectedOrderItems1 = items;
  //             this.showModal = true;
  //         },
  //         error: err => {
  //             console.error("Failed to fetch order items:", err);
  //             alert("Unable to fetch order items. Please try again later.");
  //         }
  //     });
  // }

  // public viewIterms(){

  // }

  // public viewProfile(){
  //   //this.router.navigate(['/api/'])
  // }

  



}
  


