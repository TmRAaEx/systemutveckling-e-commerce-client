import ProductCard from "@components/UI/ProductCard.tsx";
import useProducts from "@hooks/useProducts.ts";
import ProductCardSkeleton from "@components/Loaders/LoadingProductCard.tsx";

export default function ProductGrid() {
    const {products, error, loading} = useProducts();
    const loadingArr = new Array(8).fill(null);

    return (

        <>
            {error && <>{error}</>}


            {/*TODO add category filter*/}
            {/*{categories.length > 0 ? (*/}
            {/*    <ul>{categories.map((category) => (*/}
            {/*        <li key={category._id} onClick={() => {*/}
            {/*            setCategoryId(category._id)*/}
            {/*        }}>*/}
            {/*            <Text color={"text-white"}>{category.name}</Text>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*    </ul>) : null}*/}
            <ul className={"grid grid-cols-2 md:grid-cols-3 md:w-[85%] lg:w-[80%] 2xl:grid-cols-4 3xl:grid-cols-5 xl:w-[60%] mx-auto gap-4 px-2"}>
                {loading ? loadingArr.map((_, index) => (
                        <li key={index}>
                            <ProductCardSkeleton/>
                        </li>
                    ))
                    : products.map(product => (
                        <li key={product._id}>
                            <ProductCard product={product}/>
                        </li>
                    ))}
            </ul>
        </>
    )
}