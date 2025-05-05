import {useEffect, useState} from "react";
import useProducts from "@hooks/useProducts.ts";
import IProduct from "@interfaces/IProduct.ts";
import Text from "@components/UI/styled/Text.tsx";

export default function CartItem({id}: { id: string }) {
    const {getById} = useProducts();
    const [data, setData] = useState<IProduct>();
    useEffect(() => {
        const fetchData = async () => {
            const product = await getById(id);
            setData(product);
        }
        fetchData().then();
    }, [id]);


    return <>
        <Text>{data?.name}</Text>
    </>;
}