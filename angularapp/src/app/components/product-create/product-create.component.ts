import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product:Product = {productName:"",description:"",price:0,stockQuantity:0,category:"",brand:"",coverImage:""}
  productId:number;
  isEditMode:boolean=false;


  constructor(private productService : ProductService,private router :Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    // If productId exists, fetch product details for editing
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe((data: Product) => {
        this.product = data; // Populate product object with fetched data
      });
    }
  }

  public addProduct(){
    this.productService.addProduct(this.product).subscribe(data=>{
      this.router.navigate(['/admin-view-product'])
    })
  }


  public updateProduct(): void {
    // Update product using service
    this.productService.updateProduct(this.productId, this.product).subscribe(() => {
      this.router.navigate(['/admin-view-product']); // Redirect after successful update
    });
  }

}
