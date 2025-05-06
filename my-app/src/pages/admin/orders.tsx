import useOrders from "@hooks/useOrders.ts";
import Order from "@components/UI/Order.tsx";


export default function AdminPage() {

    const {orders} = useOrders();
    console.log(orders)
    return (
        <>
            <ul className={"grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"}>
                {orders.map((order) => (
                    <Order order={order}></Order>
                ))}
            </ul>
        </>)
}