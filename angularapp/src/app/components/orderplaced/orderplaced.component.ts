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
  selectedOrderItems: OrderItem[] = [];

  showModal: boolean = false;

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

    // public getOrderItemByOrderId(orderId:number){
    //   this.orderItemService.getOrderItems(orderId).subscribe(data=>{
    //   this.selectedOrderItems = data;
    //   })
    // }

    public viewItems(orderId: number): void {
      this.orderItemService.getOrderItems(orderId).subscribe({
          next: items => {
              this.selectedOrderItems = items;
              this.showModal = true;
          },
          error: err => {
              console.error("Failed to fetch order items:", err);
              alert("Unable to fetch order items. Please try again later.");
          }
      });
  }
    
  // public closeModal(): void {
  //   this.showModal = false;
  //   this.selectedOrderItems = [];
  // }   

  // public sortOrders() {
  //   this.orders.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
  // }

  // public viewProfile(user: User): void {
  //   // console.log(this.user1)
  //   this.selectedUser = user;
  // }
   
  // public closeProfile(): void {
  //   this.selectedUser = null;
  // }

  public getOrderItemByOrderId(orderId:number){
    this.orderItemService.getOrderItems(orderId).subscribe(data=>{
    this.selectedOrderItems = data;
    })
  }

  public updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, order).subscribe({
      next: () => {
        console.log(`Order status updated successfully for Order ID: ${order.orderId}`);
        alert('Order status updated successfully.');
      },
      error: (error) => {
        console.error('Failed to update order status:', error);
        alert('Failed to update order status. Please try again later.');
      }
    });
  }
 
  public isStatusDisabled(currentStatus: string, status: string): boolean {
    const statusOrder = ["Pending", "Accepted", "Dispatched", "Out For Delivery", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);
     return statusIndex < currentIndex;
    }
}