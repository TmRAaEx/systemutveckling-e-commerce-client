import ProductCard from "@components/UI/ProductCard.tsx";
import useProducts from "@hooks/useProducts.ts";
import ProductCardSkeleton from "@components/Loaders/LoadingProduct.tsx";

export default function ProductGrid() {
    const {products, error, loading} = useProducts();
    const loadingArr = new Array(8).fill(null);

    return (

        <>
            {error && <>{error}</>}
            <ul className={"grid grid-cols-2 gap-4 px-2"}>
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