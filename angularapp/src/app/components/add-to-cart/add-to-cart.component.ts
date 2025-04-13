import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  emptyMgs:string="";

  constructor(private cartService: CartService,private router:Router) { }

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
    if (this.cartItems.length === 0) {
        this.emptyMgs = "Cart is Empty";
        return;
    }

    this.cartService.clearCart(this.userId).subscribe({
        next: () => {
            console.log('Cart cleared successfully');
            this.cartItems = []; // Clear cart items in the frontend
            this.fetchUpdatedProducts(); // Fetch updated product list to restore stock
            alert('Cart has been cleared successfully!');
        },
        error: (error) => {
            console.error('Error clearing the cart:', error);
            alert('Failed to clear the cart. Please try again.');
        }
    });
}

fetchUpdatedProducts(): void {
  this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
          this.cartItems = cart.cartItems; // Update cart items
          console.log('Updated cart items:', this.cartItems);
      },
      error: (err) => {
          console.error('Error fetching updated products:', err);
      }
  });
}


  checkout() {
    const cartData = encodeURIComponent(JSON.stringify(this.cartItems));
    this.router.navigate([`/check-out/${cartData}`]);
  }
}
