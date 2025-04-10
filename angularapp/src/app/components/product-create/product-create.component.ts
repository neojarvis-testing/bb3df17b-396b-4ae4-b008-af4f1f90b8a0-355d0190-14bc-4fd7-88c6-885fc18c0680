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


  constructor(private productService : ProductService,private router :Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId=parseInt(this.activatedRoute.snapshot.paramMap.get("id"))
  }

  public addProduct(){
    this.productService.addProduct(this.product).subscribe(data=>{
      this.product=data
      if (confirm('Product added successfully! Click OK to go to the admin view.')) {
        this.router.navigate(['/admin-view-product']);
      }
    })
  }

  editedProduct:Product={
    productName: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: '',
    brand: '',
    coverImage: ''
  }
  productId:number;

}
