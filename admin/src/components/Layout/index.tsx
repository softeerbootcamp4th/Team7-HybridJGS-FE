import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
    return (
        <div className="overflow-hidden h-screen">
            <Header />
            <div className="mb-[80px]">
                <Outlet />
            </div>
        </div>
    );
}
