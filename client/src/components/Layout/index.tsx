import { CookiesProvider } from "react-cookie";
import { Outlet } from "react-router-dom";
import { PhoneNumberProvider } from "@/contexts/phoneNumberContext";
import { ScrollHeaderStyleProvider } from "@/contexts/scrollHeaderStyleContext.tsx";
import Header from "../Header";

export default function Layout() {
    return (
        <CookiesProvider>
            <ScrollHeaderStyleProvider>
                <PhoneNumberProvider>
                    <Header />
                    <Outlet />
                </PhoneNumberProvider>
            </ScrollHeaderStyleProvider>
        </CookiesProvider>
    );
}
