import { Outlet } from "react-router-dom";
import { RushEventContext } from "@/contexts/rushEventContext";
import Header from "../Header";

export default function Layout() {
    return (
        <div className="overflow-hidden h-screen">
            <Header />
            <div className="mb-[80px]">
                <RushEventContext>
                    <Outlet />
                </RushEventContext>
            </div>
        </div>
    );
}
