export const CARD_TYPE = {
    LEFT_OPTIONS: "LEFT_OPTIONS",
    RIGHT_OPTIONS: "RIGHT_OPTIONS",
} as const;

export const CARD_COLOR = {
    BLUE: "blue",
    RED: "red",
    YELLOW: "yellow",
    GREEN: "green",
} as const;

export const CARD_DAYS = {
    DAY1: 1,
    DAY2: 2,
    DAY3: 3,
    DAY4: 4,
    DAY5: 5,
    DAY6: 6,
} as const;

export const CARD_COLORS: {
    [key in (typeof CARD_DAYS)[keyof typeof CARD_DAYS]]: {
        LEFT_OPTIONS: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
        RIGHT_OPTIONS: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    };
} = {
    [CARD_DAYS.DAY1]: { LEFT_OPTIONS: CARD_COLOR.GREEN, RIGHT_OPTIONS: CARD_COLOR.BLUE },
    [CARD_DAYS.DAY2]: { LEFT_OPTIONS: CARD_COLOR.YELLOW, RIGHT_OPTIONS: CARD_COLOR.RED },
    [CARD_DAYS.DAY3]: { LEFT_OPTIONS: CARD_COLOR.BLUE, RIGHT_OPTIONS: CARD_COLOR.RED },
    [CARD_DAYS.DAY4]: { LEFT_OPTIONS: CARD_COLOR.GREEN, RIGHT_OPTIONS: CARD_COLOR.YELLOW },
    [CARD_DAYS.DAY5]: { LEFT_OPTIONS: CARD_COLOR.GREEN, RIGHT_OPTIONS: CARD_COLOR.RED },
    [CARD_DAYS.DAY6]: { LEFT_OPTIONS: CARD_COLOR.BLUE, RIGHT_OPTIONS: CARD_COLOR.YELLOW },
};

export const CARD_OPTIONS: {
    [key: number]: {
        LEFT_OPTIONS: { title: string; description: string };
        RIGHT_OPTIONS: { title: string; description: string };
    };
} = {
    [CARD_DAYS.DAY1]: {
        LEFT_OPTIONS: {
            title: "첫 차는 저렴해야 한다",
            description: "가성비 좋게 저렴한 차로 시작해서 차근히 업그레이드하고 싶어",
        },
        RIGHT_OPTIONS: {
            title: "첫 차는 안전해야 한다",
            description: "처음 사는 차인 만큼 안전한 차를 사서 오래 타고 싶어",
        },
    },
    [CARD_DAYS.DAY2]: {
        LEFT_OPTIONS: {
            title: "온라인 쇼핑이 편해서 좋다",
            description: "편한 게 최고야! 집에서 인터넷으로 쇼핑할래",
        },
        RIGHT_OPTIONS: {
            title: "오프라인 쇼핑이 확실해서 좋다",
            description: "살 거면 제대로 보고 사야지! 직접 보고 나서 판단할래",
        },
    },
    [CARD_DAYS.DAY3]: {
        LEFT_OPTIONS: {
            title: "텐트 치고 캠핑하기",
            description: "캠핑은 텐트가 근본이지!",
        },
        RIGHT_OPTIONS: {
            title: "차 안에서 차박하기",
            description: "가벼운 짐으로 차에서 잠드는 낭만이 좋아",
        },
    },
    [CARD_DAYS.DAY4]: {
        LEFT_OPTIONS: {
            title: "평생 주차 무료로 하기",
            description: "요즘 주차장은 너무 비싸 주차비 걱정은 그만 하고 싶어",
        },
        RIGHT_OPTIONS: {
            title: "평생 주유 무료로 하기",
            description: "기름값이 너무 많이 올랐어 주유비가 많이 들어 고민이야",
        },
    },
    [CARD_DAYS.DAY5]: {
        LEFT_OPTIONS: {
            title: "무채색 차가 좋다",
            description: "검은색, 흰색, 회색! 오래 타려면 무난한 게 최고야",
        },
        RIGHT_OPTIONS: {
            title: "컬러풀한 차가 좋다",
            description: "무채색은 지루해! 내가 좋아하는 색으로 고를래",
        },
    },
    [CARD_DAYS.DAY6]: {
        LEFT_OPTIONS: {
            title: "주말에는 바다보러 가기",
            description: "아까운 주말엔 국내여행이라도 다녀오고 싶어",
        },
        RIGHT_OPTIONS: {
            title: "주말에는 도심 드라이브",
            description: "평일에 너무 피곤했으니 오랜만에 동네 드라이브나 할래",
        },
    },
};

export const CARD_RESULTS: {
    [key: number]: {
        LEFT_OPTIONS: { result_title: string; result_description: string };
        RIGHT_OPTIONS: { result_title: string; result_description: string };
    };
} = {
    [CARD_DAYS.DAY1]: {
        LEFT_OPTIONS: {
            result_title: "가성비 좋은 도심형 전기차",
            result_description:
                "캐스퍼 일렉트릭은 전기차 평균보다 30% 저렴해요 첫 차로 캐스퍼 일렉트릭 어떤가요?",
        },
        RIGHT_OPTIONS: {
            result_title: "가성비 좋은 도심형 전기차",
            result_description:
                "캐스퍼는 작고 귀엽기만 하다고 생각했나요? 이젠 현대 스마트센스 안전옵션까지 지원해요",
        },
    },
    [CARD_DAYS.DAY2]: {
        LEFT_OPTIONS: {
            result_title: "현대 유일 온라인 예약",
            result_description:
                "차 살때도 온라인 쇼핑을! 오직 온라인에서만 구매할 수 있는 캐스퍼 일렉트릭",
        },
        RIGHT_OPTIONS: {
            result_title: "캐스퍼 스튜디오 송파",
            result_description:
                "캐스퍼 일렉트릭을 원하는 시간에 직접 만나볼 수 있는 무인 전시 스튜디오",
        },
    },
    [CARD_DAYS.DAY3]: {
        LEFT_OPTIONS: {
            result_title: "V2L로 캠핑 준비 끝",
            result_description:
                "캠핑장 전기 눈치싸움은 이제 그만! 차에서 직접 220V 전원을 연결할 수 있어요",
        },
        RIGHT_OPTIONS: {
            result_title: "폴 폴딩으로 공간 활용",
            result_description: "모든 시트가 완전히 접혀서 나만의 작은 방으로 만들 수 있어요",
        },
    },
    [CARD_DAYS.DAY4]: {
        LEFT_OPTIONS: {
            result_title: "전기차는 주차비 혜택 받아요",
            result_description: "공영주차장 50% 할인 정책으로 주차비 부담을 덜 수 있어요",
        },
        RIGHT_OPTIONS: {
            result_title: "전기차는 기름값 걱정 없어요",
            result_description: "모든 시트가 완전히 접혀서 나만의 작은 방으로 만들 수 있어요",
        },
    },
    [CARD_DAYS.DAY5]: {
        LEFT_OPTIONS: {
            result_title: "기본 색감도 다채롭게",
            result_description: "무채색 컬러도 매트부터 메탈릭까지 다양한 질감으로 구성했어요",
        },
        RIGHT_OPTIONS: {
            result_title: "신규 색상 5종 출시",
            result_description:
                "기존 캐스퍼 색상 라인업에 새로운 5종을 추가! 내 차의 개성을 뽐내봐요",
        },
    },
    [CARD_DAYS.DAY6]: {
        LEFT_OPTIONS: {
            result_title: "충전 한 번에 315km",
            result_description:
                "엔트리급 전기차의 주행거리 혁신 한 번 충전으로 서울에서 강릉까지 왕복도 거뜬해요",
        },
        RIGHT_OPTIONS: {
            result_title: "충전 한 번에 315km",
            result_description:
                "엔트리급 전기차의 주행거리 혁신 한 번 충전으로 서울에서 강릉까지 왕복도 거뜬해요",
        },
    },
};
