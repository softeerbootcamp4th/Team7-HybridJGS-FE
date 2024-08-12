import { CookiesProvider } from "react-cookie";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorElement from "@/pages/ErrorElement";
import Header from "../Header";

export default function Layout() {
    return (
        <ErrorBoundary fallback={<ErrorElement />}>
            <CookiesProvider>
                <div className="overflow-hidden h-screen">
                    <Header />
                    <div className="mb-[80px]">
                        <Outlet />
                    </div>
                </div>
            </CookiesProvider>
        </ErrorBoundary>
    );
}
