import TabHeader from "@/components/TabHeader";
import { RushEventContext } from "@/contexts/rushEventContext";
import EventList from "@/features/Rush/EventList";

export default function Rush() {
    return (
        <RushEventContext>
            <div className="flex flex-col items-center">
                <TabHeader />

                <EventList />
            </div>
        </RushEventContext>
    );
}
