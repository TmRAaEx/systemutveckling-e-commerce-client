import Text from "@components/UI/styled/Text.tsx";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@context/CartContext.ts";
import {useSearchParams} from "react-router";
import {IOrder} from "@interfaces/IOrder.ts";
import useOrders from "@hooks/useOrders.ts";
import Order from "@components/UI/Order.tsx"; // Adjust the import path if needed

export default function OrderConfirmation() {
    const [searchParams] = useSearchParams();
    const {clearCart} = useContext(CartContext);
    const session_id = searchParams.get("session_id");
    const [order, setOrder] = useState<IOrder | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {getByPaymentId, loading} = useOrders();

    useEffect(() => {
        clearCart();

        if (!session_id) {
            setError("Missing session ID");
            return;
        }

        const fetchOrder = async () => {
            try {
                const newOrder = await getByPaymentId(session_id);
                if (!newOrder) {
                    setError("Order not found");
                    return
                }
                const {payment_ref, ...clean} = newOrder;
                setOrder(clean);

            } catch (err) {
                setError("An error occurred while fetching the order");
            }
        };

        fetchOrder().then();
    }, [session_id]);

    if (loading) {
        return <Text className="text-center mt-8">Loading your order...</Text>;
    }

    if (error) {
        return <Text className="text-center text-red-500 mt-8">{error}</Text>;
    }

    if (order) {
        return (
            <div className="max-w-3xl mx-auto mt-8">
                <Text className="text-2xl font-bold mb-4">Thank you for your order!</Text>
                <Order order={order}/>
            </div>
        );
    }

    return null;
}
