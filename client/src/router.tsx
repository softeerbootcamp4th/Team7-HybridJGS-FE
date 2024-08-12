import { createBrowserRouter } from "react-router-dom";
import { RushAPI } from "@/apis/rushAPI.ts";
import { RushGameProvider } from "@/contexts/rushGameContext.tsx";
import { LotteryAPI } from "./apis/lotteryAPI";
import Layout from "./components/Layout";
import CasperCustom from "./pages/CasperCustom";
import CasperShowCase from "./pages/CasperShowCase";
import Lottery from "./pages/Lottery";
import Main from "./pages/Main";
import Rush from "./pages/Rush";
import RushGame from "./pages/RushGame";

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
                children: [
                    {
                        index: true,
                        element: <Rush />,
                    },
                    {
                        path: "game",
                        element: (
                            <RushGameProvider>
                                <RushGame />
                            </RushGameProvider>
                        ),
                        loader: RushAPI.getRush,
                    },
                ],
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
                        path: "custom",
                        element: <CasperCustom />,
                    },
                    {
                        path: "show-case",
                        element: <CasperShowCase />,
                        loader: LotteryAPI.getCasperList,
                    },
                ],
            },
        ],
    },
]);
