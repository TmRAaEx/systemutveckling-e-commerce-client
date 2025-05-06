import {useSearchParams} from "react-router";
import {useState} from "react";

export default function SearchBar() {

    const [_, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState<string>("");

    const handleSearch = async () => {
        setSearchParams({search: search});
        setSearch("")
    }
    return (

        <div className="flex flex-row items-center w-[50%] h-12">
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border border-gray-200 dark:border-none rounded-l-md w-full bg-white"
            />

            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    )
}