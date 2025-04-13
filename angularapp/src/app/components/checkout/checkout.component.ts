import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart: Cart = {
    cartItems: [], userId: 0,
    quantity: 0,
    product: undefined
  }; // Initialize cart with default values
  shippingAddress: string = '';
  billingAddress: string = '';
  orderItems : OrderItem;
  order : Order;
  isPopupVisible = false;

 constructor(private cartService: CartService, private router: Router , private orderService : OrderService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  if (!userId) {
    alert('Invalid user. Please log in again.');
    this.router.navigate(['/login']); // Redirect to login if user is not valid
    return;
  }

  this.cartService.getCart(userId).subscribe({
    next: (cart) => {
      this.cart = cart;
    },
    error: (error) => {
      console.error('Failed to load cart details:', error);
    }
  });

  }
  
  calculateTotalAmount(): number {
    if (!this.cart || !this.cart.cartItems) {
      return 0;
    }
    return this.cart.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }


    placeOrder() {
      const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const userEmail = localStorage.getItem('email') || '';
  const userName = localStorage.getItem('username') || '';
  const userMobileNumber = localStorage.getItem('mobileNumber') || '';
  
  if (!userId) {
    alert('Invalid user. Please log in again.');
    this.router.navigate(['/login']);
    return;
  }

  const order: Order = {
    user: {
      userId: userId,
      email: userEmail,
      username: userName,
      mobileNumber: userMobileNumber,
      password: '', // Populate if needed
      userRole: 'USER' // Default role
    },
    shippingAddress: this.shippingAddress,
    billingAddress: this.billingAddress,
    orderDate: new Date().toISOString(),
    orderItems: this.cart.cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    })),
    totalAmount: this.calculateTotalAmount(),
    orderStatus: 'Pending'
  };

  // Log to confirm the payload
  console.log('Order payload:', order);

  // Send order data to backend
  this.orderService.placeOrder(order).subscribe({
    next: () => {
      console.log('Order placed successfully');
      this.cartService.clearCart(this.cart.userId).subscribe(() => {
        console.log('Cart cleared successfully');
      });

      this.isPopupVisible = true;
      setTimeout(() => {
        this.router.navigate(['/home-page']);
      }, 2000);
    },
    error: (error) => {
      console.error('Order placement failed:', error);
      alert(`Order placement failed: ${error.message || 'Unknown error'}`);
    }
  });
    }
}