import {ChangeEvent, FormEvent, useContext, useState} from "react";
import ICustomerDetails from "@interfaces/ICustomer.ts";
import {SubmitButton} from "@components/UI/styled/Buttons.tsx";
import useOrders from "@hooks/useOrders.ts";
import {CartContext} from "@context/CartContext.ts";
import {useNavigate} from "react-router";

export default function ShippingInfoPage() {
    const [formData, setFormData] = useState<ICustomerDetails>({
        email: "",
        firstName: "",
        lastName: "",
        address: ""
    });

    const {createOrder, loading} = useOrders();
    const navigate = useNavigate()
    const {cartItems} = useContext(CartContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data: any = {
            customerDetails: formData,
            lineItems: cartItems
        }

        const createdOrderId = await createOrder(data)


        navigate(`/checkout?orderId=${createdOrderId}`)

    };

    return (
        <div className="bg-accent w-full max-w-md mx-auto p-3 rounded-xl">
            <form onSubmit={handleSubmit} className={"flex flex-col w-full justify-around h-80"}>
                {Object.keys(formData).map((key) => (
                    <input className={"h-12 outline-white bg-gray-200 p-2 rounded-lg"} name={key}
                           value={formData[key as keyof ICustomerDetails]} placeholder={key}
                           onChange={handleChange}
                           key={key}/>
                ))}
                <SubmitButton type={"submit"} loading={loading}>Continue to checkout</SubmitButton>
            </form>
        </div>
    )
}
