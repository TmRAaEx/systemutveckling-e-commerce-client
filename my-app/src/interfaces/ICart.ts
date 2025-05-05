export interface ICart {
    lineItems: ICartItem[];
}

export interface ICartItem {
    product: {
        id: string;
        price: number;
    };
    quantity: number;
}