
import { Cart } from "./cart.model";
import { Product } from "./product.model";

export interface CartItem {
    id?:number;
    product:Product;
    quantity:number;
}
