import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {useCallback, useContext} from "react";
import {CartContext} from "@context/CartContext.ts"
import {IStripeData} from "@interfaces/IStripeData.ts";
import {useNavigate, useSearchParams} from "react-router";
import apiClient, {paymentClient} from "../utils/ApiClient.ts";
import {DangerButton} from "@components/UI/styled/Buttons.tsx";
import IProduct from "@interfaces/IProduct.ts";
import MetaTags from "@components/MetaTags.tsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


interface IStripeClientSecret {
    clientSecret: string;
}

export default function CheckoutPage() {

    const {cartItems} = useContext(CartContext);
    const [searchParams] = useSearchParams()
    const orderID = searchParams.get("orderId");
    const navigate = useNavigate();


    const handleCancel = async () => {
        navigate("/products")
    }

    const fetchClientSecret = useCallback(async () => {
        //fetch product data for each cart item
        const items: IStripeData[] = await Promise.all(
            cartItems.map(async (item) => {
                const product = await apiClient.get<IProduct>(`/products/${item.product.id}`);

                return {
                    price_data: {
                        currency: "SEK",
                        product_data: {
                            name: product.name,
                            images: [product.image]
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: item.quantity as number
                };
            })
        );

        //finally fetch the stripe secret
        const clientSecretResponse = await paymentClient.post<IStripeClientSecret>("/create-checkout", {
            lineItems: items,
            orderId: orderID
        });

        return clientSecretResponse.clientSecret;

    }, [cartItems, orderID]);


    const options = {fetchClientSecret};

    return (
        <div id="checkout">
            <MetaTags
                title={"Checkout"}/>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
            <div className={"max-w-[500px] mx-auto my-5"}>
                <DangerButton onClick={handleCancel}>Cancel</DangerButton>
            </div>
        </div>
    )
}