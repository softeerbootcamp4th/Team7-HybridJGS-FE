import { createBrowserRouter } from "react-router-dom";
import CTAButton from "@/components/CTAButton";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CTAButton label="다음" onClick={() => {}} disabled={true} hasIcon={true} />,
    },
]);
