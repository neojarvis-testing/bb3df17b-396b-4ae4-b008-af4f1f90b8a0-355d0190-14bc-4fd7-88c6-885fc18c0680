import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderItemService } from 'src/app/services/order-item.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  selectedOrderItems: any[] = [];
  showModal: boolean = false;
  orders: Order[] = [];
  userId: number;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private orderItemService: OrderItemService
  ) {}

  ngOnInit(): void {
    
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getAllOrdersByUserId();
  }

  public getAllOrdersByUserId(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe(data => {
      this.orders = data;
    });
  }

  public viewItems(orderId: number): void {
    this.orderItemService.getOrderItems(orderId).subscribe(items => {
      this.selectedOrderItems = items;
      this.showModal = true;
    });
  }

  public closeModal(): void {
    this.showModal = false;
    this.selectedOrderItems = [];
  }

  public deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.orderId !== orderId); // Update the orders list
    });
  }
}
