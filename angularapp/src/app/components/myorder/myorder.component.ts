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
    const routeParam = this.activatedRoute.snapshot.paramMap.get("id");
    console.log('Route Parameter ID:', routeParam);
    if (routeParam) {
        this.userId = parseInt(routeParam, 10);
        this.getAllOrdersByUserId();
    } else {
        console.error("Route parameter 'id' is missing or invalid.");
        alert("Unable to fetch orders: User ID is missing.");
    }
  }

  public getAllOrdersByUserId(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe(data => {
      this.orders = data;
    });
  }

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
