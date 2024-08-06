import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
    return (
        <div>
            <Header />
            <div className="h-screen overflow-hidden pb-[80px]">
                <Outlet />
            </div>
        </div>
    );
}
