export interface RushEventProps {
    id: number;
    image: string;
    prizeName: string;
}

export const RUSH_EVENT_DATA: RushEventProps[] = [
    {
        id: 1,
        image: "/assets/main/rush/prize-1.png",
        prizeName: "영화 예매권",
    },
    {
        id: 2,
        image: "/assets/main/rush/prize-2.png",
        prizeName: "야구 관람권",
    },
    {
        id: 3,
        image: "/assets/main/rush/prize-3.jpg",
        prizeName: "올리브영 상품권",
    },
    {
        id: 4,
        image: "/assets/main/rush/prize-4.jpeg",
        prizeName: "쿠팡 기프트카드",
    },
    {
        id: 5,
        image: "/assets/main/rush/prize-5.jpg",
        prizeName: "배달의민족 기프트카드",
    },
    {
        id: 6,
        image: "/assets/main/rush/prize-6.jpg",
        prizeName: "BBQ 기프트카드",
    },
];
