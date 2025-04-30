import {useEffect, useState} from "react";
import apiClient from "../utils/ApiClient.ts";
import IProduct from "@interfaces/IProduct.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";
import {LocalStorage} from "@services/localstorage.ts";

export default function useProducts() {
    const storage = new LocalStorage("products");
    const [products, setProducts] = useState<IProduct[]>(storage.getItem<IProduct[]>() || [])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (products.length > 0) return;
        getAll().then()
    }, [])

    useEffect(() => {
        storage.setItem(products)
    }, [products]);


    const getAll = async () => {
        setLoading(true)
        try {
            const newProducts = await apiClient.get<IProduct[]>('/products')

            setProducts(newProducts)
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
            setProducts(prev => {
                const exists = prev.some(p => p._id === product._id);
                return exists ? prev : [...prev, product];
            });

        } catch (error) {
            setError("Error fetching products");
        } finally {
            setLoading(false)
        }
    }


    const getBySearch = async (search: string) => {
        setLoading(true)
        try {
            const searchResults = await apiClient.get<IProduct[]>(`/products/${search}`, {
                params: {
                    search: search,
                }
            })
            setProducts(searchResults)
        } catch (error) {
            setError("Error fetching search results")
        } finally {
            setLoading(false)
        }
    }


    return {products, loading, error, getById, getBySearch}
}