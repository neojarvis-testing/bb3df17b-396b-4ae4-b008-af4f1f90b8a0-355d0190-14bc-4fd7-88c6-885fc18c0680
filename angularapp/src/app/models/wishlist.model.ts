import { Product } from "./product.model";
import { WishlistItem } from "./wishlist-item.model";

export interface Wishlist {
    quantity : number;
    product : Product
    wishlistItems : WishlistItem[]
    userId : number;
}
