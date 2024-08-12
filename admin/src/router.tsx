import { createBrowserRouter } from "react-router-dom";
import { LotteryAPI } from "./apis/lotteryAPI";
import Layout from "./components/Layout";
import { ProtectedRoute, UnProtectedRoute } from "./components/Route";
import RushLayout from "./features/Rush/Layout";
import Login from "./pages/Login";
import Lottery from "./pages/Lottery";
import LotteryWinner from "./pages/LotteryWinner";
import LotteryWinnerList from "./pages/LotteryWinnerList";
import NotFound from "./pages/NotFound";
import Rush from "./pages/Rush";
import RushPrizeForm from "./pages/RushPrizeForm";
import RushSelectForm from "./pages/RushSelectForm";
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
                        index: true,
                        element: <Login />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "rush/",
                        element: <RushLayout />,
                        children: [
                            {
                                index: true,
                                element: <Rush />,
                            },
                            {
                                path: "select-form",
                                element: <RushSelectForm />,
                            },
                            {
                                path: "prize-form",
                                element: <RushPrizeForm />,
                            },
                            {
                                path: "winner-list",
                                element: <RushWinnerList />,
                            },
                        ],
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
                                loader: LotteryAPI.getLottery,
                            },
                            {
                                path: "winner-list",
                                element: <LotteryWinnerList />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);
