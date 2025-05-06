import {AddToCartButton} from "@components/UI/styled/Buttons.tsx";
import {Link} from "react-router";
import IProduct from "@interfaces/IProduct.ts";
import Text from "@components/UI/styled/Text.tsx";
import Price from "@components/UI/functional/PriceFormatter.tsx";

export default function ProductCard({product}: { product: IProduct }) {
    {/*Modified version of https://componentland.com/component/product-card-2*/
    }
    return (
        <div
            className="relative flex w-full p-2 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white dark:bg-black dark:border-gray-700 shadow-md ">

            <Link to={`/store/${product._id}`}>
                <div className={"flex w-full h-56 justify-around flex-col"}>
                    <span
                        className="relative  w-full flex h-60 overflow-hidden rounded-xl flex justify-center align-center">
                        <img className="object-scale-down"
                             src={product.image}
                             alt="product image"/>

                    </span>
                    <div className="flex flex-col h-full justify-around mt-4 px-1 pb-2">
                        <Text
                            className="text-xl tracking-tight line-clamp-1 font-bold"
                            color={"text-slate-900 dark:text-white"}>  {product.name}</Text>
                        <Text className={"text-sm px-1 font-semibold"}
                              color={"text-gray-600 dark:text-gray-200"}>{product.category.name}</Text>
                        <Text className={"text-lg font-bold"}
                              color={"text-black dark:text-white"}>{Price(product)}</Text>

                    </div>
                </div>
            </Link>
            <AddToCartButton product={product}/>
        </div>
    )
}