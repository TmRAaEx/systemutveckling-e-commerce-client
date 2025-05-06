import {Outlet} from "react-router";
import Topbar from "@components/UI/Navigation/Topbar.tsx";

export default function RootLayout() {
    return (
        <>
            <Topbar/>
            <main className="bg-background dark:bg-background-dark flex flex-col px-2 py-5 ">
                <Outlet/>
            </main>
            
        </>
    )
}