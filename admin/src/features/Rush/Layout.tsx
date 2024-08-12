import { Outlet } from "react-router-dom";
import { RushEventContext } from "@/contexts/rushEventContext";

export default function RushLayout() {
    return (
        <RushEventContext>
            <Outlet />
        </RushEventContext>
    );
}
