import {useParams} from "react-router";
import useProducts from "@hooks/useProducts.ts";
import {useEffect, useState} from "react";
import IProduct from "@interfaces/IProduct.ts";
import Text from "@components/UI/styled/Text.tsx";
import {AddToCartButton} from "@components/UI/styled/Buttons.tsx";
import MetaTags from "@components/MetaTags.tsx";
import ProductPageSkeleton from "@components/Loaders/LoadingProductPage.tsx";
import Price from "@components/UI/functional/PriceFormatter.tsx";

export default function ProductPage() {
    const {productId} = useParams();
    const [productData, setProductData] = useState<IProduct | undefined>(undefined);
    const {error, loading, getById} = useProducts();

    useEffect(() => {
        // Make sure the API call is made once productId is available
        if (productId) {
            getById(productId).then((product) => setProductData(product));
        }
    }, [productId]);

    // Show skeleton loader if still loading and no product data
    if (loading || !productData) {
        return <ProductPageSkeleton/>;
    }

    if (error) {
        return <>{error}</>
    }

    return (
        <>
            <MetaTags title={productData?.name} description={productData?.description}/>
            <div className="flex flex-col w-full items-center">
                <section className="flex flex-col text-left items-center gap-8 w-full md:w-[80%] max-w-[850px]">
                    <Text className="text-lg text-center font-bold">{productData?.name}</Text>
                    <img src={productData?.image} alt={productData?.name}/>
                    <div className="flex flex-col gap-3 w-full">
                        <span className="flex flex-col items-start gap-3">
                            <Text className="text-xl font-bold">{Price(productData)}</Text>
                            <AddToCartButton/>
                        </span>
                        <Text className="font-bold text-lg">{productData?.category.name}</Text>
                        <Text className="font-semibold text-lg underline">Description</Text>
                        <Text>{productData?.description}</Text>
                    </div>
                </section>
            </div>
        </>
    );
}
