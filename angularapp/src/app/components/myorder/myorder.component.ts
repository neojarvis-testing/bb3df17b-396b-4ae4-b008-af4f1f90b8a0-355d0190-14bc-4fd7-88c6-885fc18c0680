import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {


  orders : Order[] = [];

  productId : number = 0;

  product : Product = {
    productName : '',
    description : '',
    price : 0,
    stockQuantity : 0,
    category : '',
    brand : '',
    coverImage : ''
  }

  userId : number = 0;

  constructor(private orderService : OrderService , private productService : ProductService , private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllOrdersByUserId();
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  public getAllOrdersByUserId(){
    this.orderService.getOrdersByUserId(this.userId).subscribe(data=>{
      this.orders = data;
    })
  }

  public getProductById(){
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = data;
    })
  }

  public viewItems(){

  }

  public deleteOrder(orderId : number){
    this.orderService.deleteOrder(orderId).subscribe()
  }


}
