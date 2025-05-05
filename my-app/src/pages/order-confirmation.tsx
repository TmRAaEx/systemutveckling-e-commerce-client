import Text from "@components/UI/styled/Text.tsx";
import {useContext, useEffect} from "react";
import {CartContext} from "@context/CartContext.ts";
import {useSearchParams} from "react-router";

export default function OrderConfirmation() {
    const [searchParams] = useSearchParams();
    const {clearCart} = useContext(CartContext)
    const session_id = searchParams.get("session_id")

    useEffect(() => {
        clearCart();
    }, [session_id]);
    return <><Text>WIP</Text>;</>
}