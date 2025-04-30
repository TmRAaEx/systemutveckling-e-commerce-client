import ICategory from "@interfaces/ICategory.ts";

export default interface IProduct {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: ICategory;
}