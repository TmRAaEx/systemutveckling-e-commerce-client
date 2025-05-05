import {useEffect, useState} from "react";
import ICategory from "@interfaces/ICategory.ts";
import {LocalStorage} from "@services/localstorage.ts";
import apiClient from "../utils/ApiClient.ts";
import ErrorHandler from "../utils/ErrorHandling.ts";

export default function useCategories() {
    const storage = new LocalStorage("categories");
    const [categories, setCategories] = useState<ICategory[]>(storage.getItem<ICategory[]>() || [])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        if (categories.length > 0) return;
        getAll().then()
    }, [])

    useEffect(() => {
        storage.setItem(categories)
    }, [categories]);

    const getAll = async () => {
        setLoading(true)
        try {
            const categories = await apiClient.get<ICategory[]>("/categories");
            console.log(categories)
            setCategories(categories);
        } catch
            (error) {
            setError(ErrorHandler(error))
        } finally {
            setLoading(false)

        }
    }

    return {categories, loading, error}
}