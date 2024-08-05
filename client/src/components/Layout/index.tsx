import { Outlet } from "react-router-dom";
import { PhoneNumberProvider } from "@/contexts/phoneNumberContext";
import { ScrollAnimationProvider } from "@/contexts/scrollAnimationContext.tsx";
import Header from "../Header";

export default function Layout() {
    return (
        <ScrollAnimationProvider>
            <PhoneNumberProvider>
                <Header type="light" />
                <Outlet />
            </PhoneNumberProvider>
        </ScrollAnimationProvider>
    );
}
