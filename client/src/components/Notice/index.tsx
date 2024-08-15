import React, { memo, useEffect, useState } from "react";
import { LotteryAPI } from "@/apis/lotteryAPI.ts";
import { RushAPI } from "@/apis/rushAPI.ts";
import { formatEventDate } from "@/utils/formatDate.ts";

interface EventDateDetails {
    startDate: string;
    endDate: string;
    activePeriod: number;
}

export interface EventDateData {
    [key: string]: EventDateDetails;
}

interface SectionProps {
    title: string;
    items: string[];
    indentedIndices?: number[];
}

const Section: React.FC<SectionProps> = ({ title, items, indentedIndices = [] }) => (
    <div className="flex flex-col !leading-8 h-heading-4-regular">
        <h4 className="h-heading-4-bold">{title}</h4>
        {items.map((item, idx) => (
            <p key={idx} className={indentedIndices.includes(idx) ? "pl-8" : ""}>
                {`•ㅤ${item}`}
            </p>
        ))}
    </div>
);

const getEventsDateDetails = async (): Promise<{
    rush: EventDateDetails;
    lottery: EventDateDetails;
}> => {
    try {
        const [rushData, lotteryData] = await Promise.all([
            RushAPI.getRush(),
            LotteryAPI.getLottery(),
        ]);

        const rushEventDetails: EventDateDetails = {
            startDate: rushData.eventStartDate,
            endDate: rushData.eventEndDate,
            activePeriod: rushData.activePeriod,
        };

        const lotteryEventDetails: EventDateDetails = {
            startDate: lotteryData.eventStartDate,
            endDate: lotteryData.eventEndDate,
            activePeriod: lotteryData.activePeriod,
        };

        return {
            rush: lotteryEventDetails,
            lottery: rushEventDetails,
        };
    } catch (error) {
        console.error("Error: ", error);
        return {
            rush: { startDate: "", endDate: "", activePeriod: 0 },
            lottery: { startDate: "", endDate: "", activePeriod: 0 },
        };
    }
};

function Notice() {
    const [eventDateDetails, setEventDateDetails] = useState<EventDateData>({});

    useEffect(() => {
        (async () => {
            const details = await getEventsDateDetails();
            setEventDateDetails(details);
        })();
    }, []);

    return (
        <div className="w-full h-[756px] flex flex-col gap-y-5 bg-n-neutral-100 py-20 px-[180px] text-n-black snap-center">
            <h3 className="!leading-9 h-heading-3-bold">유의사항</h3>
            <Section
                title="이벤트 참여"
                items={[
                    "이벤트 기간",
                    formatEventDate("캐스퍼봇 뱃지 추첨 이벤트", "rush", eventDateDetails),
                    formatEventDate("선착순 밸런스 게임 이벤트", "lottery", eventDateDetails),
                    "선착순 밸런스 게임 이벤트는 이벤트 기간 내 매일 하루에 한 번씩, 기간 내 최대 6번 참여 가능합니다.",
                    "이벤트 참여 시 당첨자 연락을 위해 전화번호 기재와 개인정보 수집 동의, 마케팅 정보 수신 동의가 필수로 요구됩니다.",
                    "본 이벤트에서 제작해주신 캐스퍼봇 이미지는 추후 마케팅에 이용될 수 있습니다.",
                    "해당 이벤트는 내부 사정으로 인해 별도 공지 없이 이벤트가 조기 종료될 수 있습니다.",
                ]}
                indentedIndices={[1, 2]}
            />
            <Section
                title="경품 관련 유의사항"
                items={[
                    "이벤트 당첨자에게는 기재된 전화번호로 추후 문자메시지를 통해 연락이 전달됩니다.",
                    "미성년자의 경우 이벤트 경품에 따라 수령시 보호자의 동의가 필요할 수 있습니다.",
                    "야구 예매권은 티켓링크에서 사용 가능하며, 3만원 이하 좌석만 예매 가능합니다.",
                    "5만원 이상 경품에 대한 제세공과금은 현대자동차에서 부담하며, 제세공과금 납부 및 신고를 위한 세부 내용은 대상자에 따라 개별 안내됩니다.",
                    "비정상적이거나 불법적인 방법으로 본 이벤트에 참여하신 경우 당첨이 취소되거나 경품 환수 조치될 수 있습니다.",
                ]}
            />
            <Section
                title="이벤트 관련 문의"
                items={["casper_electric_arrivalevent@event.co.kr"]}
            />
        </div>
    );
}

export default memo(Notice);
