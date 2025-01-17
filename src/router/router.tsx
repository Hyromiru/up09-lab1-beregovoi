import { createBrowserRouter } from "react-router-dom";
import Movie from "../pages/movie";
import Search from "../pages/search";


const router = createBrowserRouter([
    {
        path:"/movie/:imdbID",
        element:<Movie />,
    },{
        index: true,
        element:<Search />,
    }
])
export default router;