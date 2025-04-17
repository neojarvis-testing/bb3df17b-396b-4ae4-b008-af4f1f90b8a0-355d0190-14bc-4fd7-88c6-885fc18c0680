export interface Product {
    productId ?: number;
    productName : string;
    description : string;
    price : number;
    stockQuantity : number;
    category : string;
    brand : string;
    coverImage : string;
    selectedQuantity ?: number;
    inWishlist?: boolean;
}
