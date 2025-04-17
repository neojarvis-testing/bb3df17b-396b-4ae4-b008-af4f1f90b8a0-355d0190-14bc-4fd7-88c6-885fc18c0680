import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { WishlistItem } from 'src/app/models/wishlist-item.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userId: number = parseInt(localStorage.getItem('userId') || '0');
  wishlistItems: WishlistItem[] = [];
  private subscription : Subscription;
  products: Product[] = [];
  productName: string;
  selectedQuantity: number;
  cartPopupVisible: boolean = false;
  wishlistPopupVisible: boolean = false;
  popupMessage: string = "";
  cartItems: CartItem;
  categories:string[]=[];
  searchData = '';
  selectedCategory = '';
  filteredProducts: Product[] = []

  constructor(private wishlistService: WishlistService, private cartService : CartService, private router: Router, private productService : ProductService) {}

  ngOnInit(): void {
    this.getAllWishlistItems();
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  getAllProducts() {
    this.subscription=this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        console.log("Raw Base64 Image Data:", product.coverImage);
        
        let imageData = product.coverImage;
        if (imageData && !imageData.startsWith('data:image')) {
          imageData = `data:image/jpeg;base64,${imageData}`;
          console.log("Prefixed Base64 Image Data:", imageData);
        } else {
          console.log("Base64 data already contains prefix or is invalid.");
        }
  

        console.log("Final Decoded Image Data for Product:", {
          productName: product.productName,
          decodedImage: imageData
        });
  
        return {
          ...product,
          decodedImage: imageData
        };
      });
  
      console.log("All Products with Decoded Images:", this.products);
  
      // this.filteredProducts = this.products;
      // this.categories = [...new Set(this.products.map(p => p.category))];
    }, error => {
      console.error("Error fetching products:", error);
    });
  }

  getAllWishlistItems() {
    this.subscription=this.wishlistService.getWishlist(this.userId).subscribe({
      next: (wishlist) => {
        this.wishlistItems = wishlist.wishlistItems;
      },
      error: (err) => console.error('Error fetching Wishlist:', err)
    });
  }

  storeWishlistData() {
    localStorage.setItem('wishlistData', JSON.stringify(this.wishlistItems));
  }

  checkout() {
    this.storeWishlistData();
    this.router.navigate(['/cart']);
  }

  clearWishlist(): void {
    localStorage.removeItem('cartData');
    this.wishlistService.clearWishlist(this.userId).subscribe({
      next: () => {
        this.getAllWishlistItems();
      },
      error: (err) => console.error("Error clearing cart:", err)
    });
  }

  updateQuantity(wishlistItem: WishlistItem, newQuantity: number) {
    if (newQuantity < 1) {
      return;
    }
  
    wishlistItem.quantity = newQuantity;
    this.wishlistService.updateWishlistItem(this.userId, wishlistItem)?.subscribe({
      next: () => {
        console.log(`Updated quantity for ${wishlistItem.product.productName} to ${newQuantity}`);
      },
      error: (err) => console.error('Error updating quantity:', err)
    });
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token');
  }  

  public removeItemFromWishlist(product: Product): void {
    if (!product || !product.productId) {
      console.error('Invalid product:', product);
      return;
    }
  
    this.subscription = this.wishlistService.removeFromWishlist(this.userId, product.productId).subscribe({
      next: () => {
        console.log(`${product.productName} removed from Wishlist successfully`);
        this.popupMessage = `${product.productName} has been removed from your Wishlist successfully!`;
        this.wishlistPopupVisible = true;
        this.wishlistItems = this.wishlistItems.filter(item => item.product.productId !== product.productId);
      },
      error: (err) => {
        console.error('Error removing product from wishlist:', err);
        this.popupMessage = `Failed to remove ${product.productName} from the Wishlist.`;
        this.wishlistPopupVisible = true;
      }
    });
  }
  
  
  
  

}
