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

  cartData:string=''

 constructor(private cartService: CartService,private activatedRoute:ActivatedRoute, private router: Router , private orderService : OrderService) { }

  ngOnInit(): void {
    this.getCartDetails();
    this.activatedRoute.params.subscribe(params => {
      this.cartData = decodeURIComponent(params['cartData']);
      console.log('Cart Data:', JSON.parse(this.cartData)); // Parse the JSON data if needed
    });
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
    const orderItems = JSON.parse(this.cartData).map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    }));

    const order: Order = {
      orderId: Math.floor(Math.random() * 1000),
      orderDate: '',
      totalAmount: this.calculateTotalAmount(),
      user: {
        userId: 1, // Replace with actual userId
        email: '',
        password: '',
        username: '',
        mobileNumber: '',
        userRole: ''
      },
      orderItems: orderItems,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      orderStatus: 'Pending'
    };
  
    this.orderService.placeOrder(order).subscribe(
      response => {
        console.log('Order placed successfully!', response);

        this.isPopupVisible = true; // Show success message or redirect
      },
      error => {
        console.error('Error placing order', error);
      }
    );
  }

  
    closePopup() {
      this.isPopupVisible = false;
    }
}