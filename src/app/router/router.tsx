import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Search from "../../pages/Search";
import MoviePage from "../../pages/MoviePage";

export const router = createBrowserRouter([
    {
        index: true,
        element: <Search />
    },
    {
        path: "movie/:id",
        element: <MoviePage />
    }
]);

export default router