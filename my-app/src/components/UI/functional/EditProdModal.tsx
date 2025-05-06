import {ChangeEvent, FormEvent, useState} from "react";
import IProduct from "@interfaces/IProduct";
import Text from "@components/UI/styled/Text";
import useCategories from "@hooks/useCategories";

interface EditProdModalProps {
    product: IProduct | undefined;
    onSave: (updatedProduct: IProduct) => void;
    onClose: () => void;
}

export default function EditProdModal({
                                          product,
                                          onSave,
                                          onClose,
                                      }: EditProdModalProps) {
    const {categories} = useCategories();

    const [formData, setFormData] = useState<IProduct>(
        product || {
            _id: "",
            name: "",
            price: 0,
            image: "",
            description: "",
            category: categories[0] || {_id: "", name: "", description: "", subCats: []},
        }
    );

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price"
                    ? parseFloat(value)
                    : name === "category"
                        ? categories.find((cat) => cat._id === value)!
                        : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-accent/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ×
                </button>

                <Text className="text-xl font-semibold mb-4" color="text-black">
                    Edit Product
                </Text>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category._id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                        <Text className="text-white font-medium">Save</Text>
                    </button>
                </form>
            </div>
        </div>
    );
}
