import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = []; // Initialize as an empty array to prevent undefined errors
  shippingAddress: string = '';
  billingAddress: string = '';
  isPopupVisible = false;
  private subscription:Subscription;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      try {
        this.cartItems = JSON.parse(storedCartData) || []; // Ensure it's always an array
      } catch (error) {
        console.error("Error parsing cart data:", error);
        this.cartItems = []; // Prevent breaking the UI
      }
    } else {
      console.error("No cart data found!");
      this.cartItems = []; // Prevent undefined errors
      this.router.navigate(['/cart']); // Redirect if no data found
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  calculateTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  placeOrder() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const userEmail = localStorage.getItem('email') || '';
    const userName = localStorage.getItem('username') || '';
    const userMobileNumber = localStorage.getItem('mobileNumber') || '';
    const userRole = 'USER';

    if (!userId) {
      alert('Invalid user. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    const order: Order = {
      user: {
        userId,
        email: userEmail,
        username: userName,
        mobileNumber: userMobileNumber,
        password: '',
        userRole
      },
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      orderDate: new Date().toISOString(),
      orderItems: this.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: this.calculateTotalAmount(),
      orderStatus: 'Pending'
    };

    this.subscription=this.orderService.placeOrder(order).subscribe({
      next: () => {
        console.log('Order placed successfully');
        localStorage.removeItem('cartData'); // Clear cart data after order placement
        this.isPopupVisible = true;
      },
      error: (error) => {
        console.error('Order placement failed:', error);
        alert(`Order placement failed: ${error.message || 'Unknown error'}`);
      }
    });
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/home-page']);
  }
}
