import {RouterProvider} from "react-router"
import {fileRouter} from "@tmraaex/simpleframework"

export default function App() {
    return (
        <div className="App">
            <RouterProvider router={fileRouter}/>
        </div>
    );
}
