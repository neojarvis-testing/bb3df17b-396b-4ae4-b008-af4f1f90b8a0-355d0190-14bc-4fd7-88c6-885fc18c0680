import { Product } from "./product.model";

export interface OrderItem {
    orderItemId ?: number;
    product : Product;
    quantity : number;
    price : number;
}
