import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0');
  cartItems: CartItem[] = [];
  emptyMgs: string = "Oops, your cart is looking lonely. Add items now to brighten its day! :)";

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        this.cartItems = cart.cartItems;
      },
      error: (err) => console.error('Error fetching cart:', err)
    });
  }

  storeCartData() {
    localStorage.setItem('cartData', JSON.stringify(this.cartItems));
  }

  checkout() {
    this.storeCartData(); // Save cart data before navigating
    this.router.navigate(['/check-out']); // Navigate to checkout page
  }

  clearCart(): void {
    localStorage.removeItem('cartData'); // Clear stored cart data
    this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        console.log("Cart cleared successfully");
        this.getAllCartItems();
      },
      error: (err) => console.error("Error clearing cart:", err)
    });
  }
}
