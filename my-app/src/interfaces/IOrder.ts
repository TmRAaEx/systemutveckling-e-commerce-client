import ICustomerDetails from "@interfaces/ICustomer.ts";

export interface IOrder {
    _id?: string;
    id?: string;
    customerDetails: ICustomerDetails;
    payment_ref?: string;
    lineItems: {
        productId: string;
        product?: {
            _id?: string;
            id?: string;
            name?: string;
            price?: number;
        }
        quantity: number;
    }[];
}
