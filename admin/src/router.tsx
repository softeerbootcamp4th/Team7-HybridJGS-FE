import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";

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
                element: <></>,
            },
            {
                path: "rush/",
                element: <></>,
            },
        ],
    },
]);
