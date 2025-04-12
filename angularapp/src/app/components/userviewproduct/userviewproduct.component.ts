import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  products:Product[]=[];
  reviews:Review[]=[];
  productname:string;
  filteredProducts:Product[]=[]
  searchData = '';
  selectedCategory = '';
  selectedQuantity:number;

  constructor(private productService:ProductService,private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
      this.selectedQuantity= 1
      this.filteredProducts=data;
    })
  }
  viewReview(productId:number){
    this.reviewService.getReviewsByProductId(productId).subscribe(data=>{
        this.reviews = data;
        
    })
  }

  // generateQuantityOptions(stock: number): number[] {
  //   return Array.from({ length: stock }, (_, i) => i + 1); // Generates [1, 2, ..., stock]
  // }

  validateQuantity(product: Product) {
    if (this.selectedQuantity > product.stockQuantity) {
        this.selectedQuantity = product.stockQuantity; // Limit to stock
        alert(`The maximum quantity for ${product.productName} is ${product.stockQuantity}.`);
    } else if (this.selectedQuantity < 1) {
        this.selectedQuantity = 1; // Set minimum value
        alert(`Please enter a quantity of at least 1 for ${product.productName}.`);
    }
}



  searchProducts() {
    this.filteredProducts = this.products.filter(data =>{
     return data.productName.toLowerCase().includes(this.searchData.toLowerCase()) &&
     (this.selectedCategory ? data.category === this.selectedCategory : true)
    });
 }

}
