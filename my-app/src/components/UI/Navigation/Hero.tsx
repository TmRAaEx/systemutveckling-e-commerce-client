import Text from "@components/UI/styled/Text.tsx";
import {Link} from "react-router";

export default function Hero() {
    return (

        <section className="relative w-full">

            <Text
                className={"text-lg md:text-xl lg:text-2xl font-bold absolute left-1/2 md:left-1/3 lg:left-1/4 transform -translate-x-1/2 top-8 w-85 "}>
                "The leading choice for custom boats,
                premium boating supplies
                and adventure"
                — boating enthusiasts
            </Text>
            <img
                src="/hero.png"
                alt="Hero image of a boat on water"
                className="h-80 md:h-120 xl:h-250 w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full">
                <nav className="flex flex-row items-center justify-around bg-accent/90 py-2 h-13 ">
                    <Link to="/store" className="text-white ">
                        <Text className={"text-xl font-bold"}>Store</Text>
                    </Link>
                    <Link to="/boats" className="text-white ">
                        <Text className={"text-xl font-bold"}> Boats</Text>
                    </Link>
                    <Link to="/partners" className="text-white ">
                        <Text className={"text-xl font-bold"}>Partners</Text>
                    </Link>
                </nav>
            </div>
        </section>
    )
}
