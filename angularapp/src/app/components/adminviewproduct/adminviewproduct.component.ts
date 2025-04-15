import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {

  products:Product[]=[]
  filteredProducts:Product[]=[]
  searchData = '';
  selectedCategory = '';
  categories:string[]=[]

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe(data=>{
  //     this.products=data
  //     this.filteredProducts=data;
  //   })
  // }

  getAllProducts(): void {
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
  
  

  searchProducts() {
     this.filteredProducts = this.products.filter(data =>{
      return data.productName.toLowerCase().includes(this.searchData.toLowerCase()) &&
      (this.selectedCategory ? data.category === this.selectedCategory : true)
     });
  }

  editProduct(productId){
    this.router.navigate(['/edit-product',productId])
  }
   
  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(data=>{
      this.getAllProducts()
    })
  }
}
