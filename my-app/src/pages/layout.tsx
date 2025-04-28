import {Outlet} from "react-router";
import Topbar from "@components/UI/Topbar.tsx";

export default function RootLayout() {
    return (
        <>
            <Topbar/>
            <main className="bg-background dark:bg-background-dark flex flex-col px-2 py-20 min-h-[100vh]">
                <Outlet/>
            </main>
            <footer>
                footer
            </footer>
        </>
    )
}