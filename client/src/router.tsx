import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import CasperCustom from "./pages/CasperCustom";
import CasperShowCase from "./pages/CasperShowCase";
import Lottery from "./pages/Lottery";
import Main from "./pages/Main";
import Rush from "./pages/Rush";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: "rush/",
                element: <Rush />,
            },
            {
                path: "lottery/",
                children: [
                    {
                        index: true,
                        element: <Lottery />,
                    },
                    {
                        path: "custom",
                        element: <CasperCustom />,
                    },
                    {
                        path: "show-case",
                        element: <CasperShowCase />,
                    },
                ],
            },
        ],
    },
]);
