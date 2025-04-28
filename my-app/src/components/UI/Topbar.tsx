import {Link} from "react-router";
import Text from "@components/UI/Text.tsx";

export default function Topbar() {
    return (<>
        <header className={"flex flex-row w-full items-center"}>
            <section className="relative w-full">

                <Text className={"text-lg font-bold  absolute left-1/2 transform -translate-x-1/2 top-8 w-85 "}>
                    "The leading choice for custom boats,
                    premium boating supplies
                    and adventure"
                    — boating enthusiasts
                </Text>
                <img
                    src="/hero.png"
                    alt="Hero image of a boat on water"
                    className="h-80 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full">
                    <nav className="flex flex-row items-center justify-around bg-accent/90 py-2 h-13 ">
                        <Link to="products" className="text-white ">
                            <Text className={"text-xl font-bold"}>Supplies</Text>
                        </Link>
                        <Link to="boats" className="text-white ">
                            <Text className={"text-xl font-bold"}> Boats</Text>
                        </Link>
                        <Link to="partners" className="text-white ">
                            <Text className={"text-xl font-bold"}>Partners</Text>
                        </Link>
                    </nav>
                </div>
            </section>

        </header>
    </>)
}