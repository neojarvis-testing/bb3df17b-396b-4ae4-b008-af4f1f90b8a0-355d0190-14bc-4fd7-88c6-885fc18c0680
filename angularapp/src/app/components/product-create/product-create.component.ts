import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product:Product = {productName:"",description:"",price:null,stockQuantity:0,category:"",brand:"",coverImage:""}


  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  }

  public addProduct(product : Product){
    //

  }

  public submit() {

  }

}
