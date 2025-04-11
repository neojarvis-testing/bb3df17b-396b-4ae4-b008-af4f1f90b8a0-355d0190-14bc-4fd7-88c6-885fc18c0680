import { Product } from "./product.model";

export interface Cart {

    productId : number;
    quantity : number;
    product : Product
    
}