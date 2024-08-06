import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Lottery from "./pages/Lottery";
import Rush from "./pages/Rush";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "login/",
                element: <Login />,
            },
            {
                path: "lottery/",
                element: <Lottery />,
            },
            {
                path: "rush/",
                element: <Rush />,
            },
        ],
    },
]);
