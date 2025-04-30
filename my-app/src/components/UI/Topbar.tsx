import Hero from "@components/UI/Hero.tsx";
import {Link, useLocation} from "react-router";
import Text from "@components/UI/Text.tsx";
import {useState} from "react";

export default function Topbar() {
    const location = useLocation();
    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        console.log(search);
        setSearch("")
    }
    return (<>
        <header className={"flex flex-col w-full items-center"}>
            {location.pathname == "/" ? <Hero/> :
                <>
                    <div className="flex flex-row w-full h-16 items-center space-x-4 bg-white dark:bg-background-dark">
                        <Link to={"/"}>
                            <img src="/logo-icon-big.png" width="48" height="48" alt="Logo icon"/>
                        </Link>

                        <div className="flex flex-row items-center w-50 max-w-xs h-12">
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
                    </div>


                    <nav className="flex flex-row items-center w-full justify-around bg-accent
                 py-2 h-8 w-full ">
                        <Link to="/supplies" className="text-white ">
                            <Text className={"text-md font-bold"} color={"text-white "}>Store</Text>
                        </Link>
                        <Link to="/boats" className="text-white ">
                            <Text className={"text-md font-bold"} color={"text-white "}> Boats</Text>
                        </Link>
                        <Link to="/partners" className="text-white ">
                            <Text className={"text-md font-bold"} color={"text-white "}>Partners</Text>
                        </Link>
                    </nav>
                </>
            }
        </header>
    </>)
}