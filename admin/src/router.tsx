import { createBrowserRouter } from "react-router-dom";
import { LotteryAPI } from "./apis/lotteryAPI";
import Layout from "./components/Layout";
import { ProtectedRoute, UnProtectedRoute } from "./components/Route";
import Login from "./pages/Login";
import Lottery from "./pages/Lottery";
import LotteryWinner from "./pages/LotteryWinner";
import LotteryWinnerList from "./pages/LotteryWinnerList";
import Rush from "./pages/Rush";
import RushWinnerList from "./pages/RushWinnerList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <UnProtectedRoute />,
                children: [
                    {
                        path: "login/",
                        element: <Login />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
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
                                loader: LotteryAPI.getLottery,
                            },
                            {
                                path: "winner-list",
                                element: <LotteryWinnerList />,
                            },
                        ],
                    },
                    {
                        path: "rush/",
                        children: [
                            {
                                index: true,
                                element: <Rush />,
                            },
                            {
                                path: "winner-list",
                                element: <RushWinnerList />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
