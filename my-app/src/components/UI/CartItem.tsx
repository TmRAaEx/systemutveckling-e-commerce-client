import {useEffect, useState} from "react";
import useProducts from "@hooks/useProducts.ts";
import IProduct from "@interfaces/IProduct.ts";
import Text from "@components/UI/styled/Text.tsx";
import Price from "@components/UI/functional/PriceFormatter.tsx";

export default function CartItem({id, quantity}: { id: string; quantity: number }) {
    const {getById} = useProducts();
    const [data, setData] = useState<IProduct>();

    useEffect(() => {
        const fetchData = async () => {
            const product = await getById(id);
            setData(product);
        };
        fetchData();
    }, [id]);

    if (!data) return null;

    return (
        <div className="flex items-center gap-4 border-b border-gray-200 py-4">
            <img
                src={data.image}
                alt={data.name}
                className="w-18 h-18 object-scale-down
                 rounded-md"
            />
            <div className="flex flex-col flex-1">
                <Text className="text-base font-medium line-clamp-2">{data.name}</Text>
                <Text className="text-sm" color={"text-gray-200"}>{Price(data)}</Text>
            </div>
            <Text className="text-sm font-semibold text-gray-800">{quantity}x</Text>
        </div>
    );
}
