import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
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
  popupVisible: boolean = false;

  userId: number = parseInt(localStorage.getItem('userId'));
  cartItems: CartItem;

  constructor(private productService: ProductService, private reviewService: ReviewService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
        this.products = data.map(product => ({ ...product, selectedQuantity: 1 })); // Initialize selectedQuantity
        this.filteredProducts = this.products; // Ensure filtered list matches initialized products
    });
}


  // getAllProducts() {
  //   this.productService.getAllProducts().subscribe(data => {
  //     this.products = data;
  //     this.selectedQuantity = 1;
  //     this.filteredProducts = data;
  //   })
  // }
  viewReview(productId: number) {
    this.reviewService.getReviewsByProductId(productId).subscribe(data => {
      this.reviews = data;
    })
    this.popupVisible = true;
  }

  // validateQuantity(product: Product) {
  //   if (this.selectedQuantity > product.stockQuantity) {
  //     this.selectedQuantity = product.stockQuantity; // Limit to stock
  //     alert(`The maximum quantity for ${product.productName} is ${product.stockQuantity}.`);
  //   } else if (this.selectedQuantity < 1) {
  //     this.selectedQuantity = 1; // Set minimum value
  //     alert(`Please enter a quantity of at least 1 for ${product.productName}.`);
  //   }
  // }

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
        (this.selectedCategory ? data.category === this.selectedCategory : true)
    }
    );
  }

 closePopup() {
  this.popupVisible = !(this.popupVisible);
 }

 
  // addToCart(product:Product){
  // let productId = product.productId;
  // let qty:number = this.selectedQuantity;

  // }
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
            this.getAllProducts(); // Refresh product list to update stock
        },
        error: (err) => {
            console.error('Error adding product to cart:', err);
            alert('Failed to add product to cart. Please try again.');
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
