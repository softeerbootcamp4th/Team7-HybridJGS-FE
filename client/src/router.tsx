import { createBrowserRouter } from "react-router-dom";
import { LotteryAPI } from "./apis/lotteryAPI";
import Layout from "./components/Layout";
import CasperCustom from "./pages/CasperCustom";
import CasperShowCase from "./pages/CasperShowCase";
import ErrorElement from "./pages/ErrorElement";
import Lottery from "./pages/Lottery";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
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
                        loader: LotteryAPI.getLottery,
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "custom",
                        element: <CasperCustom />,
                    },
                    {
                        path: "show-case",
                        element: <CasperShowCase />,
                        loader: LotteryAPI.getCasperList,
                        errorElement: <ErrorElement />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
