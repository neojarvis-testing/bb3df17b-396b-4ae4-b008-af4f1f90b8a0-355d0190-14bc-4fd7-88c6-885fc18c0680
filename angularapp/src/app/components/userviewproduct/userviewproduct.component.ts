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
  popupVisible1: boolean = false; // Popup 1 visibility
  popupMessage1: string = ''; // Popup 1 message
  popupVisible2: boolean = false; // Popup 2 visibility
  popupMessage2: string = ''; // Popup 2 message  
  loading: boolean = false; // Track loading state
  categories:string[]=[]

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
    this.productService.getAllProducts().subscribe(data => {
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
    this.reviewService.getReviewsByProductId(productId).subscribe({
      next: (data) => {
        this.reviews = data; // Assign fetched reviews
        if (this.reviews.length === 0) {
          this.popupMessage2 = 'No reviews found for this product.';
        } else {
          this.popupMessage2 = 'Reviews loaded successfully!';
        }
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching reviews:', err); // Log error
        this.popupMessage2 = 'Failed to load reviews. Please try again.';
        this.loading = false; // Stop loading in case of error
      },
    });
    this.popupVisible2 = true; // Show the popup
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

  closePopup1() {
    this.popupVisible1 = false; // Hide the pop-up
  }

  closePopup2() {
    this.popupVisible2 = false; // Hide the pop-up
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
        this.popupMessage1 = `${qty} x ${product.productName} has been added to your cart successfully!`; // Set success message
        this.popupVisible1 = true; // Show the pop-up
        this.getAllProducts(); // Refresh product list to update stock
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.popupMessage1 = `Failed to add ${product.productName} to the cart. Please try again.`; // Error message
        this.popupVisible1 = true; // Show the error pop-up
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
