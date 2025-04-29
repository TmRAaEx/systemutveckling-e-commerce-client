import ProductCard from "@components/UI/ProductCard.tsx";
import useProducts from "@hooks/useProducts.ts";

export default function ProductGrid() {
    const {products, error, loading} = useProducts();
    console.log(products);
    return (
        <ul className={"grid grid-cols-2 gap-2 px-2"}>
            {products.map(product => (
                <li key={product._id}>
                    <ProductCard product={product}/>
                </li>
            ))}
        </ul>
    )
}