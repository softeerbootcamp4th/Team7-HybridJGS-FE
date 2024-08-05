import { CookiesProvider } from "react-cookie";
import { Outlet } from "react-router-dom";
import { PhoneNumberProvider } from "@/contexts/phoneNumberContext";
import Header from "../Header";

export default function Layout() {
    return (
        <CookiesProvider>
            <PhoneNumberProvider>
                <Header type="light" />
                <Outlet />
            </PhoneNumberProvider>
        </CookiesProvider>
    );
}
