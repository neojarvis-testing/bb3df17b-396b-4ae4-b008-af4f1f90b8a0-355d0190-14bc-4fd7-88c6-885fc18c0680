import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products: Product[] = [];
  reviews: Review[] = [];
  filteredProducts: Product[] = [];
  searchData = '';
  selectedCategory = ''; // Tracks the selected category from the dropdown or URL
  selectedQuantity: number;
  cartPopupVisible: boolean = false; // Separate property for Add to Cart pop-up
  wishlistPopupVisible: boolean = false;
  reviewPopupVisible: boolean = false;
  popupMessage: string = ""; // Message for the pop-up
  loading: boolean = false; // Track loading state
  categories: string[] = []; // Unique product categories
  private subscription: Subscription;

  userId: number = parseInt(localStorage.getItem('userId')!); // Retrieve user ID
  cartItems: CartItem;

  constructor(
    private wishlistService: WishlistService,
    private productService: ProductService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllProducts(); // Fetch products
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || ''; // Get category from query params
      this.filterProductsByCategory(); // Filter products based on the category
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAllProducts(): void {
    this.subscription = this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        let imageData = product.coverImage;

        // Check if the image data needs a prefix
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
        }

        return {
          ...product,
          decodedImage: imageData, // Store the final image source
          inWishlist: false // Default state for wishlist icon
        };
      });

      this.filteredProducts = this.products; // Initialize filtered products
      this.categories = [...new Set(this.products.map(p => p.category))]; // Extract unique categories
      this.filterProductsByCategory(); // Apply filtering if category is already set
    }, error => {
      console.error("Error fetching products:", error); // Log any errors in the API call
    });
  }

  filterProductsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products; // Show all products if no category is selected
    }
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(data => {
      return data.productName.toLowerCase().includes(this.searchData.toLowerCase()) &&
        (this.selectedCategory ? data.category === this.selectedCategory : true);
    });
  }

  viewReview(productId: number): void {
    this.loading = true; // Start loading
    this.subscription = this.reviewService.getReviewsByProductId(productId).subscribe({
      next: (data) => {
        this.reviews = data; // Assign fetched reviews
        this.popupMessage = this.reviews.length
          ? 'Reviews loaded successfully!'
          : 'No reviews found for this product.';
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching reviews:', err); // Log error
        this.popupMessage = 'Failed to load reviews. Please try again.';
        this.loading = false; // Stop loading in case of error
      },
    });

    this.reviewPopupVisible = true; // Show the View Reviews pop-up
  }

  validateQuantity(product: Product): void {
    if (product.selectedQuantity > product.stockQuantity) {
      product.selectedQuantity = product.stockQuantity; // Limit to available stock
      alert(`The maximum quantity for ${product.productName} is ${product.stockQuantity}.`);
    } else if (product.selectedQuantity < 1) {
      product.selectedQuantity = 1; // Set minimum value
      alert(`Please enter a quantity of at least 1 for ${product.productName}.`);
    }
  }

  handleAction(product: Product): void {
    if (this.isLoggedIn()) {
      this.addToCart(product); 
    } else {
      const confirmRedirect = confirm('You need to log in to add items to your cart. Do you want to go to the login page?');
      if (confirmRedirect) {
        this.router.navigate(['/login']); // Redirect to the login page
      }
    }
  }

  addToCart(product: Product): void {
    const productId = product.productId;
    const qty = product.selectedQuantity;

    if (qty > product.stockQuantity) {
      alert(`You can only add up to ${product.stockQuantity} of ${product.productName}.`);
      return;
    }

    this.subscription = this.cartService.addToCart(this.userId, productId, qty, null).subscribe({
      next: () => {
        console.log('Product added to cart successfully');
        this.popupMessage = `${qty} x ${product.productName} has been added to your cart successfully!`;
        this.cartPopupVisible = true; // Show Add to Cart pop-up
        this.getAllProducts();
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.popupMessage = `Failed to add ${product.productName} to the cart. Please try again.`;
        this.cartPopupVisible = true;
      },
    });
  }

  addToWishlist(product: Product): void {
    const productId = product.productId;
    const qty = 1;

    this.subscription = this.wishlistService.addToWishlist(this.userId, productId, qty, null).subscribe({
      next: () => {
        console.log(`${product.productName} added to Wishlist successfully`);
        this.popupMessage = `${product.productName} has been added to your wishlist successfully!`;
        this.wishlistPopupVisible = true;
      },
      error: (err) => {
        console.error(`Error adding ${product.productName} to wishlist:`, err);
        this.popupMessage = `Failed to add ${product.productName} to the wishlist.`;
        this.wishlistPopupVisible = true;
      },
    });
  }

  removeFromWishlist(product: Product): void {
    const productId = product.productId;

    this.subscription = this.wishlistService.removeFromWishlist(this.userId, productId).subscribe({
      next: () => {
        console.log(`${product.productName} removed from Wishlist successfully`);
        this.popupMessage = `${product.productName} has been removed from your wishlist successfully!`;
        this.wishlistPopupVisible = true;
      },
      error: (err) => {
        console.error(`Error removing ${product.productName} from wishlist:`, err);
        this.popupMessage = `Failed to remove ${product.productName} from the wishlist.`;
        this.wishlistPopupVisible = true;
      },
    });
  }

  handleActionWishlist(product: Product): void {
    product.inWishlist = !product.inWishlist;

    if (product.inWishlist) {
      this.addToWishlist(product);
    } else {
      this.removeFromWishlist(product);
    }
  }

  closeCartPopup(): void {
    this.cartPopupVisible = false;
  }

  closeWishlistPopup(): void {
    this.wishlistPopupVisible = false;
  }

  closeReviewPopup(): void {
    this.reviewPopupVisible = false;
  }

  clearCart(): void {
    this.subscription = this.cartService.clearCart(this.userId).subscribe({
      next: () => {
        console.log('Cart cleared successfully');
        this.getAllProducts();
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        alert('Failed to clear cart. Please try again.');
      }
    });
  }
}
