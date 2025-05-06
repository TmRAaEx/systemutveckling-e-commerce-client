import {useEffect, useState} from "react";
import {IOrder} from "@interfaces/IOrder.ts";
import apiClient from "../utils/ApiClient.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";
import useProducts from "./useProducts"; // Importera hooken

export default function useOrders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {getById: getProductData} = useProducts();

    useEffect(() => {
        getAll().then();
    }, []);

    const getAll = async () => {
        setLoading(true);
        try {
            const newOrders = await apiClient.get<IOrder[]>("/orders");

            const ordersWithProducts = await Promise.all(
                newOrders.map(async (order) => {
                    const updatedLineItems = await Promise.all(
                        order.lineItems.map(async (item) => {
                            try {
                                const product = await getProductData(item.productId);
                                return {...item, product};
                            } catch {
                                return item;
                            }
                        })
                    );
                    return {...order, lineItems: updatedLineItems};
                })
            );

            setOrders(ordersWithProducts);
        } catch (error) {
            setError(ErrorHandler(error));
        } finally {
            setLoading(false);
        }
    };


    const getByPaymentId = async (id: string) => {
        setLoading(true);
        try {
            const order = await apiClient.get<IOrder>(`/orders/paymentId/${id}`);
            const items = await Promise.all(
                order.lineItems.map(async (item) => {
                    try {
                        const product = await getProductData(item.productId);
                        return {...item, product};
                    } catch {
                        return item;
                    }
                })
            );
            return {...order, lineItems: items};
        } catch (error) {
            setError(ErrorHandler(error));
        } finally {
            setLoading(false);
        }
    }

    const createOrder = async (data: IOrder) => {
        setLoading(true);
        try {
            const response = await apiClient.post<IOrder>("/orders/create", data);
            setOrders([...orders, response]);
            return response._id;
        } catch (error) {
            setError(ErrorHandler(error));
        } finally {
            setLoading(false);
        }
    };

    return {orders, loading, error, createOrder, getByPaymentId};
}
