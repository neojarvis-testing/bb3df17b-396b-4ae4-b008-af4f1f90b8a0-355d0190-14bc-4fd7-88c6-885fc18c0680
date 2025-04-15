import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products: Product[] = [];
  reviews: Review[] = [];
  productname: string;
  filteredProducts: Product[] = []
  searchData = '';
  selectedCategory = '';

  selectedQuantity: number;
  popupVisible: boolean = false; // Track pop-up visibility
  popupMessage: string = ""; // Message for the pop-up
  loading: boolean = false; // Track loading state


  userId: number = parseInt(localStorage.getItem('userId')); // Retrieve user ID
  cartItems: CartItem;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token');
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => ({ ...product, selectedQuantity: 1 })); // Initialize selectedQuantity
      this.filteredProducts = this.products; // Ensure filtered list matches initialized products
    });
  }

  viewReview(productId: number) {
    this.loading = true; // Start loading
    this.reviewService.getReviewsByProductId(productId).subscribe({
      next: (data) => {
        this.reviews = data; // Assign fetched reviews
        if (this.reviews.length === 0) {
          this.popupMessage = 'No reviews found for this product.';
        } else {
          this.popupMessage = 'Reviews loaded successfully!';
        }
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching reviews:', err); // Log error
        this.popupMessage = 'Failed to load reviews. Please try again.';
        this.loading = false; // Stop loading in case of error
      },
    });
    this.popupVisible = true; // Show the popup
  }
  
  

  validateQuantity(product: Product) {
    if (product.selectedQuantity > product.stockQuantity) {
      product.selectedQuantity = product.stockQuantity; // Limit to available stock
      alert(`The maximum quantity for ${product.productName} is ${product.stockQuantity}.`);
    } else if (product.selectedQuantity < 1) {
      product.selectedQuantity = 1; // Set minimum value
      alert(`Please enter a quantity of at least 1 for ${product.productName}.`);
    }
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(data => {
      return data.productName.toLowerCase().includes(this.searchData.toLowerCase()) &&
        (this.selectedCategory ? data.category === this.selectedCategory : true);
    });
  }

  closePopup() {
    this.popupVisible = false; // Hide the pop-up
  }

  handleAction(product : Product) {
    if (this.isLoggedIn()) {
      this.addToCart(product); 
    } else {
      const confirmRedirect = confirm('You need to log in to add items to your cart. Do you want to go to the login page?');
      if (confirmRedirect) {
        this.router.navigate(['/login']); // Redirect to the login page
      }
    }
  }

  public addToCart(product: Product) {
    const productId = product.productId;
    const qty = product.selectedQuantity;

    if (qty > product.stockQuantity) {
      alert(`You can only add up to ${product.stockQuantity} of ${product.productName}.`);
      return;
    }

    this.cartService.addToCart(this.userId, productId, qty, null).subscribe({
      next: () => {
        console.log('Product added to cart successfully');
        this.popupMessage = `${qty} x ${product.productName} has been added to your cart successfully!`; // Set success message
        this.popupVisible = true; // Show the pop-up
        this.getAllProducts(); // Refresh product list to update stock
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.popupMessage = `Failed to add ${product.productName} to the cart. Please try again.`; // Error message
        this.popupVisible = true; // Show the error pop-up
      }
    });
  }

  

  clearCart(): void {
    this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        console.log('Cart cleared successfully');
        this.getAllProducts(); // Refresh product list to reflect restored stock
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        alert('Failed to clear cart. Please try again.');
      }
    });
  }
}
