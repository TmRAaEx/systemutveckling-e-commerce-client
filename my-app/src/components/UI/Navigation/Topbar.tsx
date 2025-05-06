import Hero from "@components/UI/Navigation/Hero.tsx";
import {Link, NavLink, useLocation} from "react-router";
import Text from "@components/UI/styled/Text.tsx";
import CartIcon from "@components/UI/CartIcon.tsx";
import SearchBar from "@components/UI/Navigation/searchBar.tsx";
import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";


export default function Topbar() {
    const location = useLocation();
    const {getCartTotalItems} = useContext(CartContext)

    return (<>
        <header className={"flex flex-col w-full items-center"}>
            {location.pathname == "/" ? <Hero/> :
                <>
                    <div
                        className="flex flex-row w-full h-16 md:h-20 items-center justify-between space-x-4 bg-white dark:bg-background-dark px-2 md:px-5">
                        <Link to={"/"}>
                            <img src="/logo-icon-big.png" width="48" height="48" alt="Logo icon"/>
                        </Link>
                        <SearchBar/>

                        <NavLink to={"/cart"}>
                            <p className="text-white text-lg flex flex-row items-center gap-1 relative">
                                Cart
                                <span className="relative">
                                <CartIcon/>
                                    {getCartTotalItems() > 0 ?
                                        <span
                                            className="absolute top-3 -right-1 bg-blue-500 text-white text-xs
                                font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {getCartTotalItems()}
                            </span>
                                        : null}
                            </span>
                            </p>
                        </NavLink>
                    </div>


                    <nav className="flex flex-row items-center w-full justify-around bg-accent
                 py-2 h-8 md:h-10 w-full ">
                        <NavLink to="/store" className="text-white ">
                            <Text className={"text-md md:text-lg lg:text-xl  font-bold"}
                                  color={"text-white "}>Store</Text>
                        </NavLink>
                        <NavLink to="/boats" className="text-white ">
                            <Text className={"text-md md:text-lg  lg:text-xl font-bold"}
                                  color={"text-white "}> Boats</Text>
                        </NavLink>
                        <NavLink to="/partners" className="text-white ">
                            <Text className={"text-md  md:text-lg lg:text-xl font-bold"}
                                  color={"text-white "}>Partners</Text>
                        </NavLink>
                    </nav>
                </>
            }
        </header>
    </>)
}