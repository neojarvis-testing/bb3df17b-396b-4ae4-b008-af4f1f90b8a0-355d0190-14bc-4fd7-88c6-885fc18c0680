import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isFormInvalid = false;
  private subscription:Subscription;

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

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  public addProduct(){
    if (!this.product.productName || 
      !this.product.description || 
      !this.product.price || this.product.price < 0 || 
      !this.product.stockQuantity || this.product.stockQuantity < 0 || 
      !this.product.category || 
      !this.product.brand || 
      !this.product.coverImage) {
    this.isFormInvalid = true;
    return; // Prevent form submission
  }
  else{
    this.isFormInvalid = false;
    this.subscription=this.productService.addProduct(this.product).subscribe(data=>{
      this.router.navigate(['/admin-view-product'])
    })
  }
  }

  public updateProduct(): void {
    // Update product using service
    this.subscription=this.productService.updateProduct(this.productId, this.product).subscribe(() => {
      this.router.navigate(['/admin-view-product']); // Redirect after successful update
    });
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        console.log("Base64 Image Data:", reader.result); // Debugging
        // Assign Base64 result directly to the model property
        this.product.coverImage = reader.result as string; 
      };
  
      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
      };
    }
  }
  
}
