import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  cartPopupVisible: boolean = false; // Separate property for Add to Cart pop-up
  reviewPopupVisible: boolean = false;
  popupMessage: string = ""; // Message for the pop-up
  loading: boolean = false; // Track loading state
  categories:string[]=[]
  private subscription:Subscription;

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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // getAllProducts() {
  //   this.productService.getAllProducts().subscribe(data => {
  //     this.products = data.map(product => ({ ...product, selectedQuantity: 1 })); // Initialize selectedQuantity
  //     this.filteredProducts = this.products; // Ensure filtered list matches initialized products
  //   });
  // }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token');
  }

  getAllProducts() {
    this.subscription=this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        console.log("Raw Base64 Image Data:", product.coverImage); // Log raw data from backend
        
        let imageData = product.coverImage;
  
        // Check if the image data needs a prefix
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
          console.log("Prefixed Base64 Image Data:", imageData); // Log the prefixed Base64 string
        } else {
          console.log("Base64 data already contains prefix or is invalid.");
        }
  
        // Log the final state of the image data
        console.log("Final Decoded Image Data for Product:", {
          productName: product.productName,
          decodedImage: imageData
        });
  
        return {
          ...product,
          decodedImage: imageData // Store the final image source
        };
      });
  
      console.log("All Products with Decoded Images:", this.products); // Log the complete products array
  
      this.filteredProducts = this.products; // Initialize filtered products
      this.categories = [...new Set(this.products.map(p => p.category))]; // Extract unique categories
    }, error => {
      console.error("Error fetching products:", error); // Log any errors in the API call
    });
  }

  viewReview(productId: number) {
    this.loading = true; // Start loading
    this.subscription=this.reviewService.getReviewsByProductId(productId).subscribe({
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

    this.reviewPopupVisible = true; // Show the View Reviews pop-up
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
    this.reviewPopupVisible = false; // Hide the pop-up
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
  
    this.subscription=this.cartService.addToCart(this.userId, productId, qty, null).subscribe({
      next: () => {
        console.log('Product added to cart successfully');
        this.popupMessage = `${qty} x ${product.productName} has been added to your cart successfully!`; // Set success message
        this.cartPopupVisible = true; // Show Add to Cart pop-up
        this.getAllProducts(); 
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.popupMessage = `Failed to add ${product.productName} to the cart. Please add quantity.`; // Error message
        this.cartPopupVisible = true; // Show the error pop-up
      },
    });
  }
  
  closeCartPopup() {
    this.cartPopupVisible = false; // Close Add to Cart pop-up
  }
  
  closeReviewPopup() {
    this.reviewPopupVisible = false; // Close View Reviews pop-up
  }

  clearCart(): void {
    this.subscription=this.cartService.clearCart(this.userId).subscribe({
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
