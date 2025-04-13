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
  currentOrderStatus: string = '';
  showTrackOrderModal: boolean = false;
  cancelOrderId: number = null; // Store the ID of the order to be canceled
  showCancelPopup: boolean = false;

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

  // public deleteOrder(orderId: number): void {
  //   this.orderService.deleteOrder(orderId).subscribe(() => {
  //     this.orders = this.orders.filter(order => order.orderId !== orderId); // Update the orders list
  //   });
  // }

  public openTrackOrderModal(orderStatus: string): void {
    this.currentOrderStatus = orderStatus; // Set the current order status
    this.showTrackOrderModal = true;
  }

  public closeTrackOrderModal(): void {
    this.showTrackOrderModal = false;
  }

  public getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'accepted':
        return 'accepted';
      case 'dispatched':
        return 'dispatched';
      case 'outfordelivery':
        return 'outfordelivery';
      case 'delivered':
        return 'delivered';
      default:
        return 'pending'; // Default to "Pending"
    }
  }

  public deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.orderId !== orderId);
    });
  }

  openCancelPopup(orderId: number): void {
    this.cancelOrderId = orderId; // Set the order ID to be canceled
    this.showCancelPopup = true; // Show the popup
}

closeCancelPopup(): void {
    this.showCancelPopup = false; // Hide the popup
    this.cancelOrderId = null; // Clear the order ID
}

confirmCancelOrder(): void {
    if (this.cancelOrderId) {
        this.deleteOrder(this.cancelOrderId); // Call deleteOrder method
        this.closeCancelPopup(); // Close the popup
    }
}
}
