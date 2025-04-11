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


  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data
      this.filteredProducts=data;
    })
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
