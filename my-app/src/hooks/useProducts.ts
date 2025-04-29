import {useEffect, useState} from "react";
import apiClient from "../utils/ApiClient.ts";
import IProduct from "@interfaces/IProduct.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";

export default function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        getAll().then()
    }, [])


    const getAll = async () => {
        setLoading(true)
        try {
            const products = await apiClient.get<IProduct[]>('/products')
            setProducts(products)
        } catch (error) {
            setError(ErrorHandler(error))
        } finally {
            setLoading(false)
        }
    }


    const getById = async (id: IProduct["_id"]) => {
        setLoading(true)
        try {
            const product = await apiClient.get<IProduct>(`/products/${id}`)
            setProducts([...products, product])
        } catch (error) {
            setError(ErrorHandler(error))
        } finally {
            setLoading(false)
        }
    }


    const getBySearch = async (search: string) => {
        setLoading(true)
        //TODO develop on backend and implement
    }


    return {products, loading, error, getById}
}