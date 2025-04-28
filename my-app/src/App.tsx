import {RouterProvider} from "react-router"
import {fileRouter} from "@tmraaex/simpleframework" //my own "framework" currently only contains router
import {HelmetProvider} from "react-helmet-async";

export default function App() {
    return (
        <div className="App">
            <HelmetProvider>
                <RouterProvider router={fileRouter}/>
            </HelmetProvider>
        </div>
    );
}
