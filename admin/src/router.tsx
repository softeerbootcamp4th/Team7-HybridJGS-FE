import { createBrowserRouter } from "react-router-dom";
import { LotteryAPI } from "./apis/lotteryAPI";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Lottery from "./pages/Lottery";
import LotteryWinner from "./pages/LotteryWinner";
import LotteryWinnerList from "./pages/LotteryWinnerList";
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
                        loader: LotteryAPI.getLottery,
                    },
                    {
                        path: "winner",
                        element: <LotteryWinner />,
                    },
                    {
                        path: "winner-list",
                        element: <LotteryWinnerList />,
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
