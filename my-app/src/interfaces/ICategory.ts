export default interface ICategory {
    _id: string;
    name: string;
    description: string;
    subCats: ICategory[];
}