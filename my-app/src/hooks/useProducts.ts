import {useEffect, useState} from "react";
import apiClient from "../utils/ApiClient.ts";
import IProduct from "@interfaces/IProduct.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";
// import {LocalStorage} from "@services/localstorage.ts";

export default function useProducts() {
    // const storage = new LocalStorage("products");
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getAll().then()
    }, [])

    // useEffect(() => {
    //     storage.setItem(products)
    // }, [products]);


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
        try {
            const productExist = products.find(i => i._id === id)
            if (productExist) return productExist
            setLoading(true)
            const product = await apiClient.get<IProduct>(`/products/${id}`);
            if (!product) {
                throw new Error("Product not found");
            }
            return product

        } catch (error) {
            setError("Error fetching product");
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

    const getByCategory = async (categoryId: string) => {
        setLoading(true)
        try {
            const products = await apiClient.get<IProduct[]>(`/products/category/${categoryId}`);
            setProducts(products)
        } catch (error) {
            setError("Error fetching search results")
        } finally {
            setLoading(false)
        }
    }

    return {products, loading, error, getById, getBySearch, getByCategory}
}