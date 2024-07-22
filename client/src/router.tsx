import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <div className="h-heading-1-bold rounded-1000 bg-gradient-green pb-1000">
                    Hello world!
                </div>
            </>
        ),
    },
]);
