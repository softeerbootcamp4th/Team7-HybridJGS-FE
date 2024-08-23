import { CookiesProvider } from "react-cookie";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { PhoneNumberProvider } from "@/contexts/phoneNumberContext";
import { ScrollHeaderStyleProvider } from "@/contexts/scrollHeaderStyleContext.tsx";
import ErrorElement from "@/pages/ErrorElement";
import Header from "../Header";

export default function Layout() {
    return (
        <ErrorBoundary fallback={<ErrorElement />}>
            <CookiesProvider>
                <ScrollHeaderStyleProvider>
                    <PhoneNumberProvider>
                        <Header />
                        <Outlet />
                    </PhoneNumberProvider>
                </ScrollHeaderStyleProvider>
            </CookiesProvider>
        </ErrorBoundary>
    );
}
