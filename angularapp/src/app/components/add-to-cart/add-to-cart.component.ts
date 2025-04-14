import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  userId: number = parseInt(localStorage.getItem('userId') || '0');
  cartItems: CartItem[] = [];
  emptyMgs: string = "";
  products: any[] = []; // Store all products for stock restoration

  constructor(private cartService: CartService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCartItems();
    this.fetchProducts(); // Fetch products initially
  }

  public getAllCartItems() {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart: Cart) => {
        console.log('Cart received:', cart);
        this.cartItems = cart.cartItems;
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products; // Store product list for stock restoration
        console.log("Fetched all products:", this.products);
      },
      error: (err) => console.error("Error fetching products:", err)
    });
  }

  clearCart(): void {
    if (this.cartItems.length === 0) {
      this.emptyMgs = "Cart is Empty";
      return;
    }

    // Restore stock **before** clearing the cart
    this.cartItems.forEach(cartItem => {
      let product = this.products.find(p => p.productId === cartItem.product.productId);
      if (product) {
        product.stockQuantity += cartItem.quantity; // Restore stock locally
        console.log(`Stock restored for product ${product.productId}: ${product.stockQuantity}`);
      }
    });

    this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        console.log("Cart cleared successfully");

        this.fetchUpdatedProducts(); // Refresh UI after clearing the cart

        alert("Cart has been cleared successfully!");
      },
      error: (error) => {
        console.error("Error clearing the cart:", error);
        alert("Failed to clear the cart. Please try again.");
      }
    });
  }

  fetchUpdatedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log("Updated product stock:", this.products);
      },
      error: (err) => console.error("Error fetching updated products:", err)
    });

    this.getAllCartItems();  // Refresh cart UI
  }

  updateQuantity(cartItem: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;

    cartItem.quantity = newQuantity;

    this.cartService.updateCartItem(this.userId, cartItem).subscribe({
      next: () => console.log("Quantity updated successfully"),
      error: (err) => console.error("Error updating quantity:", err)
    });
  }

  checkout() {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        this.cartItems = cart.cartItems; 
        const cartData = encodeURIComponent(JSON.stringify(this.cartItems));
        this.router.navigate([`/check-out/${cartData}`]);
      },
      error: (err) => console.error('Error fetching updated cart before checkout:', err)
    });
  }
}
