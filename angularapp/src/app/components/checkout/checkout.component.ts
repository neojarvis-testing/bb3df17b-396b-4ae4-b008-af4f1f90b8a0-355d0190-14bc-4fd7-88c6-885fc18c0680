import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  // cart: Cart;
  // shippingAddress: string = '';
  // billingAddress: string = '';

  // constructor(private cartService: CartService, private router: Router) { }

  // ngOnInit(): void {
  //   this.getCartDetails();
  // }

  // getCartDetails() {
  //   this.cartService.getCart(parseInt(localStorage.getItem('userId'))).subscribe(data => {
  //     this.cart = data;
  //   });
  // }

  // placeOrder() {
  //   const order: Order = {
  //     orderId: Math.floor(Math.random() * 1000),
  //     cart : this.cart,
  //     shippingAddress: this.shippingAddress,
  //     billingAddress: this.billingAddress,
  //     orderStatus: 'Pending' // Set default status to 'Pending'
  //   };

  //   // Logic to handle order placement
  //   console.log('Order placed successfully!', order);
  //   // Redirect to order success page or show success message
  //   this.router.navigate(['/order-success']);
  // }

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
    this.cartService.getCart(parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.cart = data;
    });
  }

  calculateTotalAmount(): number {
    if (!this.cart || !this.cart.cartItems) {
      return 0;
    }
    return this.cart.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  placeOrder() {
    const order : Order = {
      orderId: Math.floor(Math.random() * 1000),
      orderDate: "",
      totalAmount: this.calculateTotalAmount(),
      user: {
        userId: this.cart.userId,
        email: '',
        password: '',
        username: '',
        mobileNumber: '',
        userRole: ''
      }, // Assuming user object contains userId
      orderItems: this.cart.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      orderStatus: 'Pending' // Set default status to 'Pending'
    };
        
     this.orderService.placeOrder(order).subscribe(
      response => {
      console.log('Order placed successfully!', response);
      // this.router.navigate(['/user-view-product']);
        this.isPopupVisible = true;
       },
       error => {
     console.error('Error placing order', error);
     }
    );
  
    

  //   // Logic to handle order placement
  //   console.log('Order placed successfully!', order);
  //   // Redirect to order success page or show success message
  //   //this.router.navigate(['/order-success']);
  // }

  // public placeOrder(order : Order){
    
  // }




    }

    closePopup() {
      this.isPopupVisible = false;
    }
    


}






