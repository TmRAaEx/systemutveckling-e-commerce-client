import {RouterProvider} from "react-router"
import {fileRouter} from "@tmraaex/simpleframework" //my own "framework" currently only contains router
import {HelmetProvider} from "react-helmet-async";
import {CartProvider} from "@providers/CartProvider.tsx";

export default function App() {
    return (
        <div className="App">
            <HelmetProvider>
                <CartProvider>
                    <RouterProvider router={fileRouter}/>
                </CartProvider>
            </HelmetProvider>
        </div>
    );
}
