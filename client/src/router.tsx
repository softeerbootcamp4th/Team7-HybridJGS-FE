import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import BotCustom from "./pages/BotCustom";
import BotCustomResult from "./pages/BotCustomResult";
import BotShowCase from "./pages/BotShowCase";
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
                        element: <BotCustom />,
                    },
                    {
                        path: "result",
                        element: <BotCustomResult />,
                    },
                    {
                        path: "show-case",
                        element: <BotShowCase />,
                    },
                ],
            },
        ],
    },
]);
