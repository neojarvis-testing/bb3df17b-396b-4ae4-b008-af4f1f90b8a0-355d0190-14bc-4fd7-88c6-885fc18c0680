import { CartItem } from "./cart-item.model";
import { Product } from "./product.model";

export interface Cart {
    quantity : number;
    product : Product
    cartItem : CartItem
    userId : number;
}