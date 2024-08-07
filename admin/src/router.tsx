import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Lottery from "./pages/Lottery";
import LotteryWinner from "./pages/LotteryWinner";
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
                children: [
                    {
                        index: true,
                        element: <Lottery />,
                    },
                    {
                        path: "winner",
                        element: <LotteryWinner />,
                    },
                ],
            },
            {
                path: "rush/",
                element: <Rush />,
            },
        ],
    },
]);
