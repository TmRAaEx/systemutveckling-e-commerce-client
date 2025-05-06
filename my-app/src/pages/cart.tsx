import {useContext, useEffect, useState} from "react";
// @ts-ignore
import Cookies from "js-cookie";
import {CartContext} from "@context/CartContext.ts";
import {ICartItem} from "@interfaces/ICart.ts";
import CartItem from "@components/UI/CartItem.tsx";
import Text from "@components/UI/styled/Text.tsx";
import LoginModal from "@components/UI/functional/SiginIn.tsx";
import {Link} from "react-router"
import apiClient from "../utils/ApiClient.ts";
import MetaTags from "@components/MetaTags.tsx";

export default function CartPage() {
    const {cartItems, getCartTotal} = useContext(CartContext);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null)
    useEffect(() => {
        const userId = Cookies.get("user_id");
        if (!userId || userId === "undefined") {
            setIsLoggedIn(false)
            return
        }
        setIsLoggedIn(true);
        setUser(userId);
    }, []);


    const saveCart = async () => {
        const cart = await apiClient.post("/carts/create",
            {
                lineItems: cartItems,
                userId: user
            })

        console.log(cart)

    }

    if (cartItems.length === 0) {
        return <><MetaTags
            title={"Cart"}
            description={"Your shopping cart"}/><Text>Your cart is empty</Text></>;
    }


    return (
        <>
            <MetaTags
                title={"Cart"}
                description={"Your shopping cart"}/>
            <ul>
                {cartItems.map((item: ICartItem) => (
                    <li key={item.product.id}>
                        <CartItem id={item.product.id} quantity={item.quantity}/>
                    </li>
                ))}
            </ul>
            <Text className={"font-bold text-xl"}>Total: {getCartTotal()}kr</Text>
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)}/>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {!isLoggedIn ? (
                        <>s
                            <button
                                className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
                                <Link to={"/shipping"}>
                                    <Text className="text-white font-medium">Continue as Guest</Text>
                                </Link>
                            </button>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                                <Text className="font-medium" color="text-gray-800">Sign in</Text>
                            </button>
                        </>
                    ) :
                    <button
                        onClick={saveCart}
                        className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                        <Link to={"/shipping"}><Text className="font-medium" color="text-gray-800">Continue to
                            checkout</Text></Link>
                    </button>
                }
            </div>
        </>
    );
}
