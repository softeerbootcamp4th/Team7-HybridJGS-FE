import { Outlet } from "react-router-dom";
import { PhoneNumberProvider } from "@/contexts/phoneNumberContext";
import { ScrollHeaderStyleProvider } from "@/contexts/scrollHeaderStyleContext.tsx";
import Header from "../Header";

export default function Layout() {
    return (
        <ScrollHeaderStyleProvider>
            <PhoneNumberProvider>
                <Header />
                <Outlet />
            </PhoneNumberProvider>
        </ScrollHeaderStyleProvider>
    );
}
