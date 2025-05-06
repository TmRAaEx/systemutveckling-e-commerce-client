import {ReactNode, useEffect, useState} from "react";
import {ICartItem} from "@interfaces/ICart.ts";
import {CartContext} from "@context/CartContext.ts";


//modified version of a cartProvider for a previous project

export const CartProvider = ({children}: { children: ReactNode }) => {
    const cachedCart = localStorage.getItem("cartItems");
    const [cartItems, setCartItems] = useState<ICartItem[]>(cachedCart ? JSON.parse(cachedCart) : []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (item: ICartItem) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
        if (isItemInCart) {
            console.log(isItemInCart);
            console.log(item)
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.product.id === item.product.id
                        ? {
                            ...cartItem,
                        //todo add logic for changing amount
                            quantity: item.quantity ? item.quantity + 1 : 1,
                        }
                        : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, {...item, quantity: item.quantity ?? 1}]);
        }
    };


    const removeFromCart = (item: ICartItem) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.product.id === item.product.id);
        if (!isItemInCart) return;
        if (isItemInCart.quantity === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.product.id !== item.product.id));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.product.id === item.product.id
                        ? {...cartItem, quantity: (cartItem.quantity ? cartItem.quantity : 1) - 1}
                        : cartItem
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };


    const deleteCartItem = (id: string) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.product.id === id);
        if (!isItemInCart) return;
        setCartItems(cartItems.filter((cartItem) => cartItem.product.id !== id));
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * (item.quantity ? item.quantity : 1), 0);
    };

    const getCartTotalItems = () => {

        return cartItems.reduce((total, item) => total + (item.quantity ? item.quantity : 1), 0);
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartTotalItems,
                deleteCartItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}