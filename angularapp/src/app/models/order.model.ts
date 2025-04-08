import { OrderItem } from "./order-item.model";

export interface Order {
    orderId ?: number;
    orderDate : string;
    orderStatus : string;
    shippingAddress : string;
    billingAddress : string;
    totalAmount : number;
    user : User;
    orderItems : OrderItem[];
}
