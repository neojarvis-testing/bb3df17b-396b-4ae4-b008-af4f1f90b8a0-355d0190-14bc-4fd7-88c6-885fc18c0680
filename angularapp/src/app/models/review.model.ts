import { Product } from "./product.model";

export interface Review {
    reviewId ?: number;
    reviewText : string;
    rating : number;
    date : string;
    user : User;
    product : Product;
}
