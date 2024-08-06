import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <p className="text-red-400 h-heading-1-bold">modified</p>,
    },
]);
