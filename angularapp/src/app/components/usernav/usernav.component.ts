import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  userId: number = parseInt(localStorage.getItem('userId')!);
  username: string = localStorage.getItem('username')!;
  popupVisible: boolean = false;
  userDetailsPopupVisible: boolean = false;
  user : any = {};
  categories: any[] = ['Fashion', 'Electronics', 'Home Appliances', 'Books', 'Toys', 'Furniture', 'Beauty']; // Store product categories dynamically

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadCategories();
  }

  private loadUserDetails(): void {
    this.authService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }

  private loadCategories(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.categories = [...new Set(products.map(product => product.category))];
    });
  }

  public confirmLogout(): void {
    this.popupVisible = true;
  }

  public cancelLogout(): void {
    this.popupVisible = false;
  }

  public logoutConfirmed(): void {
    this.authService.logout();
    this.popupVisible = false;
  }

  public showUserDetails(): void {
    this.userDetailsPopupVisible = true;
  }

  public closeUserDetails(): void {
    this.userDetailsPopupVisible = false;
  }

  public navigateToCategory(category: string): void {
    this.router.navigate(['/user-view-product'], { queryParams: { category: category } }); // Navigate to filtered products
  }
}
