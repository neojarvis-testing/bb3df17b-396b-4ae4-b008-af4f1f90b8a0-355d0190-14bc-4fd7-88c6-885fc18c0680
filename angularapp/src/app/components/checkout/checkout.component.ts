import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingAddress: string = '';
  billingAddress: string = '';
  isPopupVisible = false;
  isQrPopupVisible = false;
  qrCodeUrl: string = '';
  isPaymentCompleted = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      try {
        this.cartItems = JSON.parse(storedCartData) || [];
      } catch (error) {
        console.error("Error parsing cart data:", error);
        this.cartItems = [];
      }
    } else {
      console.error("No cart data found!");
      this.cartItems = [];
      this.router.navigate(['/cart']);
    }
  }

  calculateTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  async generateQrCode(): Promise<void> {
    const totalAmount = this.calculateTotalAmount();
    const upiId = 'Arunganesh1956@okaxis';
    const qrData = `upi://pay?pa=${upiId}&pn=Vishal Sujatha Achimuthu&am=${totalAmount}&cu=INR`;

    try {
      this.qrCodeUrl = await QRCode.toDataURL(qrData);
      this.isQrPopupVisible = true;
    } catch (error) {
      console.error('Failed to generate QR Code:', error);
      alert('Failed to generate QR Code.');
    }
  }

  confirmPayment(): void {
    this.isPaymentCompleted = true;
    this.isQrPopupVisible = false;
    this.placeOrder();
  }

  cancelPayment(): void {
    this.isQrPopupVisible = false;
    this.router.navigate(['/cart']);
  }

  placeOrder(): void {
    if (!this.isPaymentCompleted) {
      alert('Please complete the payment first.');
      this.generateQrCode();
      return;
    }

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

    const order = {
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

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        console.log('Order placed successfully');
        localStorage.removeItem('cartData');
        this.isPopupVisible = true;
      },
      error: (error) => {
        console.error('Order placement failed:', error);
        alert(`Order placement failed: ${error.message || 'Unknown error'}`);
      }
    });
  }

  closePopup() {
    this.isPopupVisible = false; // Hide the popup
    this.router.navigate(['/user-view-product']); // Redirect to View Products page
}
}
