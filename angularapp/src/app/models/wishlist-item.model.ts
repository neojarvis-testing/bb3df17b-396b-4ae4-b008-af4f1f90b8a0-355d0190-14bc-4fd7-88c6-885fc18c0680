import { Product } from "./product.model";

export interface WishlistItem {
    id?:number;
    product:Product;
    quantity:number;
}
