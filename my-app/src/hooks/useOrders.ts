import {useEffect, useState} from "react";
import {IOrder} from "@interfaces/IOrder.ts";
import apiClient from "../utils/ApiClient.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";

export default function useOrders() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        getAll().then()
    }, [])

    const getAll = async () => {
        setLoading(true)
        try {
            const newOrders = await apiClient.get<IOrder[]>('/orders')
            setOrders(newOrders)
        } catch (error) {
            setError(ErrorHandler(error))
        } finally {
            setLoading(false)
        }
    }

    const createOrder = async (data: IOrder) => {
        setLoading(true)
        try {
            const response = await apiClient.post<IOrder>(`/orders/create`, data)
            setOrders(
                [...orders, response]
            )
            return response._id;
        } catch (error) {
            setError(ErrorHandler(error))
        } finally {
            setLoading(false)
        }
    }

    return {orders, loading, error, createOrder}

}