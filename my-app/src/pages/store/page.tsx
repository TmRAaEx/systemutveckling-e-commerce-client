import ProductGrid from "@components/UI/ProductGrid.tsx";
import MetaTags from "@components/MetaTags.tsx";

export default function Page() {

    return <>
        <MetaTags
            title={"Products"}
            description={"Here you can find all the equipment and supplies you could ever need for your boat"}/>
        <ProductGrid/>
    </>
}