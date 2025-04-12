import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  // Ensure that userId is retrieved correctly (provide a fallback if needed)
  userId: number = parseInt(localStorage.getItem('userId') || '0');
  
  // Change type to CartItem[] because you expect to receive a list of cart items.
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllCartItems();
  }

  public getAllCartItems() {
    this.cartService.getCart(this.userId)
      .subscribe({
        next: (cart: Cart) => {
          console.log('Cart received:', cart);
          // Assign the cartItems array from the cart received from backend.
          this.cartItems = cart.cartItems;
        },
        error: (err) => {
          console.error('Error fetching cart:', err);
        }
      });
  }

  clearCart(): void {
    this.cartService.clearCart(this.userId)
      .subscribe({
        next: () => {
          console.log('Cart cleared successfully');
          // Clear local cart items to update the view.
          this.cartItems = [];
          this.getAllCartItems();
        },
        error: (error) => {
          console.error('Error clearing the cart:', error);
        }
      });
  }
}
