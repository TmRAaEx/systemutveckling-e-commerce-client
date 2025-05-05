import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";
import {ICartItem} from "@interfaces/ICart.ts";
import CartItem from "@components/CartItem.tsx";

export default function CartPage() {
    const cart = useContext(CartContext);
    console.log(cart)
    return <>
        <ul>
            {cart.cartItems.map((item: ICartItem) => (
                <li><CartItem id={item.product.id}/></li>
            ))}
        </ul>
    </>
}