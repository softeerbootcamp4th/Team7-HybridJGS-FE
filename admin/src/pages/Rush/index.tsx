import { useState } from "react";
import TabHeader from "@/components/TabHeader";
import { RUSH_SECTION, RushSectionType } from "@/constants/rush";
import { RushEventContext } from "@/contexts/rushEventContext";
import ApplicantList from "@/features/Rush/ApplicantList";
import EventList from "@/features/Rush/EventList";

export default function Rush() {
    const [selectedSection, setSelectedSection] = useState<RushSectionType>(
        RUSH_SECTION.EVENT_LIST
    );
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const handleSelectSection = (idx: number, section: RushSectionType) => {
        setSelectedIdx(idx);
        setSelectedSection(section);
    };

    console.log(selectedSection);

    const renderChildren = () => {
        if (selectedSection === RUSH_SECTION.EVENT_LIST) {
            return <EventList handleSelectSection={handleSelectSection} />;
        } else if (selectedSection === RUSH_SECTION.APPLICANT_LIST) {
            return (
                <ApplicantList
                    navigatePrevSection={() => setSelectedSection(RUSH_SECTION.EVENT_LIST)}
                    selectedIdx={selectedIdx}
                />
            );
        }

        return <></>;
    };

    return (
        <RushEventContext>
            <div className="flex flex-col items-center">
                <TabHeader />

                {renderChildren()}
            </div>
        </RushEventContext>
    );
}
