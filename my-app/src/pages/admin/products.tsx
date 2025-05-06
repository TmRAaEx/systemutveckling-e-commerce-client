import useProducts from "@hooks/useProducts.ts";
import AdminProductCard from "@components/UI/AdminProductCard.tsx";
import {useEffect, useState} from "react";
import IProduct from "@interfaces/IProduct.ts";
import EditProdModal from "@components/UI/functional/EditProdModal.tsx";
import CreateProdModal from "@components/UI/functional/CreateProdModal.tsx";
import {SubmitButton} from "@components/UI/styled/Buttons.tsx";


export default function ProductsAdmin() {
    const [isEditOpen, setisEditOpen] = useState(false);
    const [editingId, setEditingId] = useState<IProduct["_id"] | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const {products, update, create} = useProducts();


    useEffect(() => {
            setisEditOpen(true);
        },
        [editingId]);

    const handleClose = () => {
        setisEditOpen(false);
        setEditingId(null)
        setIsCreateOpen(false)
    }

    const handleSave = async (data: IProduct) => {
        await update(data)
    }


    const handleCreate = async (data: IProduct) => {
        await create(data)
    }
    return (
        <>
            {isEditOpen && editingId && (
                <EditProdModal product={products.find((item) => item._id == editingId)} onSave={handleSave}
                               onClose={handleClose}/>)}
            {isCreateOpen && (<CreateProdModal onSave={handleCreate} onClose={handleClose}/>)}

            <ul className={"mt-2 grid grid-cols-2 md:grid-cols-3 md:w-[85%] lg:w-[80%] 2xl:grid-cols-4 3xl:grid-cols-5 xl:w-[60%] mx-auto gap-4 px-2"}>
                <li key={"Create button"} className={"col-span-full"}>
                    <SubmitButton onClick={() =>
                    setIsCreateOpen(true)
                }>
                    Create new Product
                </SubmitButton></li>
                {products.map((product) => (
                    <AdminProductCard product={product} editHandler={() => setEditingId(product._id)}/>
                ))}
            </ul>
        </>
    )
}