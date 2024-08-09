import { ReactNode } from "react";

export const CARD_TYPE = {
    FIRST_CARD: "FIRST_CARD",
    SECOND_CARD: "SECOND_CARD",
} as const;

export const CARD_COLOR = {
    BLUE: "blue",
    RED: "red",
    YELLOW: "yellow",
    GREEN: "green",
} as const;

export const CARD_SELECTED_STATUS = {
    TRUE: "true",
    FALSE: "false",
} as const;

export const CARD_DAYS = {
    DAY1: 1,
    DAY2: 2,
    DAY3: 3,
    DAY4: 4,
    DAY5: 5,
    DAY6: 6,
} as const;

// TODO: 추후 API 연동 / 색상은 클라이언트 측에서 픽스
export const CARD_COLORS: {
    [key in (typeof CARD_DAYS)[keyof typeof CARD_DAYS]]: {
        FIRST_CARD: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
        SECOND_CARD: (typeof CARD_COLOR)[keyof typeof CARD_COLOR];
    };
} = {
    [CARD_DAYS.DAY1]: { FIRST_CARD: CARD_COLOR.GREEN, SECOND_CARD: CARD_COLOR.BLUE },
    [CARD_DAYS.DAY2]: { FIRST_CARD: CARD_COLOR.YELLOW, SECOND_CARD: CARD_COLOR.RED },
    [CARD_DAYS.DAY3]: { FIRST_CARD: CARD_COLOR.BLUE, SECOND_CARD: CARD_COLOR.RED },
    [CARD_DAYS.DAY4]: { FIRST_CARD: CARD_COLOR.GREEN, SECOND_CARD: CARD_COLOR.YELLOW },
    [CARD_DAYS.DAY5]: { FIRST_CARD: CARD_COLOR.GREEN, SECOND_CARD: CARD_COLOR.RED },
    [CARD_DAYS.DAY6]: { FIRST_CARD: CARD_COLOR.BLUE, SECOND_CARD: CARD_COLOR.YELLOW },
};

export const CARD_TITLES: { [key: number]: { FIRST_CARD: string; SECOND_CARD: string } } = {
    [CARD_DAYS.DAY1]: { FIRST_CARD: "첫 차는 저렴해야 한다", SECOND_CARD: "첫 차는 안전해야 한다" },
    [CARD_DAYS.DAY2]: {
        FIRST_CARD: "온라인 쇼핑이 편해서 좋다",
        SECOND_CARD: "오프라인 쇼핑이 확실해서 좋다",
    },
    [CARD_DAYS.DAY3]: { FIRST_CARD: "텐트 치고 캠핑하기", SECOND_CARD: "차 안에서 차박하기" },
    [CARD_DAYS.DAY4]: { FIRST_CARD: "평생 주차 무료로 하기", SECOND_CARD: "평생 주유 무료로 하기" },
    [CARD_DAYS.DAY5]: { FIRST_CARD: "무채색 차가 좋다", SECOND_CARD: "컬러풀한 차가 좋다" },
    [CARD_DAYS.DAY6]: {
        FIRST_CARD: "주말에는 바다보러 가기",
        SECOND_CARD: "주말에는 도심 드라이브",
    },
};

export const CARD_DESCRIPTION: {
    [key: number]: {
        FIRST_CARD: {
            [status in (typeof CARD_SELECTED_STATUS)[keyof typeof CARD_SELECTED_STATUS]]: ReactNode[];
        };
        SECOND_CARD: {
            [status in (typeof CARD_SELECTED_STATUS)[keyof typeof CARD_SELECTED_STATUS]]: ReactNode[];
        };
    };
} = {
    [CARD_DAYS.DAY1]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>
                    가성비 좋은
                    <br />
                    도심형 전기차
                </>,
                <>
                    캐스퍼 일렉트릭은 전기차 평균보다 30% 저렴해요
                    <br />첫 차로 캐스퍼 일렉트릭 어떤가요?
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    가성비 좋게 저렴한 차로 시작해서
                    <br />
                    차근히 업그레이드하고 싶어
                </>,
            ],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>
                    가성비 좋은
                    <br />
                    도심형 전기차
                </>,
                <>
                    캐스퍼는 작고 귀엽기만 하다고 생각했나요?
                    <br />
                    이젠 현대 스마트센스 안전옵션까지 지원해요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    처음 사는 차인 만큼
                    <br />
                    안전한 차를 사서 오래 타고 싶어
                </>,
            ],
        },
    },
    [CARD_DAYS.DAY2]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>현대 유일 온라인 예약</>,
                <>
                    차 살때도 온라인 쇼핑을!
                    <br />
                    오직 온라인에서만 구매할 수 있는 캐스퍼 일렉트릭
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    편한 게 최고야!
                    <br />
                    집에서 인터넷으로 쇼핑할래
                </>,
            ],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>캐스퍼 스튜디오 송파</>,
                <>
                    캐스퍼 일렉트릭을 원하는 시간에
                    <br />
                    직접 만나볼 수 있는 무인 전시 스튜디오
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    살 거면 제대로 보고 사야지!
                    <br />
                    직접 보고 나서 판단할래
                </>,
            ],
        },
    },
    [CARD_DAYS.DAY3]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>V2L로 캠핑 준비 끝</>,
                <>
                    캠핑장 전기 눈치싸움은 이제 그만!
                    <br />
                    차에서 직접 220V 전원을 연결할 수 있어요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [<>캠핑은 텐트가 근본이지!</>],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>폴 폴딩으로 공간 활용</>,
                <>
                    모든 시트가 완전히 접혀서
                    <br />
                    나만의 작은 방으로 만들 수 있어요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    가벼운 짐으로
                    <br />
                    차에서 잠드는 낭만이 좋아
                </>,
            ],
        },
    },
    [CARD_DAYS.DAY4]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>
                    전기차는
                    <br />
                    주차비 혜택 받아요
                </>,
                <>
                    공영주차장 50% 할인 정책으로
                    <br />
                    주차비 부담을 덜 수 있어요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    요즘 주차장은 너무 비싸
                    <br />
                    주차비 걱정은 그만 하고 싶어
                </>,
            ],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>
                    전기차는
                    <br />
                    기름값 걱정 없어요
                </>,
                <>
                    모든 시트가 완전히 접혀서
                    <br />
                    나만의 작은 방으로 만들 수 있어요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    기름값이 너무 많이 올랐어
                    <br />
                    주유비가 많이 들어 고민이야
                </>,
            ],
        },
    },
    [CARD_DAYS.DAY5]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>기본 색감도 다채롭게</>,
                <>
                    무채색 컬러도 매트부터 메탈릭까지
                    <br />
                    다양한 질감으로 구성했어요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    검은색, 흰색, 회색!
                    <br />
                    오래 타려면 무난한 게 최고야
                </>,
            ],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>신규 색상 5종 출시</>,
                <>
                    기존 캐스퍼 색상 라인업에 새로운 5종을 추가!
                    <br />내 차의 개성을 뽐내봐요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    무채색은 지루해!
                    <br />
                    내가 좋아하는 색으로 고를래
                </>,
            ],
        },
    },
    [CARD_DAYS.DAY6]: {
        FIRST_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>충전 한 번에 315km</>,
                <>
                    엔트리급 전기차의 주행거리 혁신
                    <br />한 번 충전으로 서울에서 강릉까지 왕복도 거뜬해요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    아까운 주말엔
                    <br />
                    국내여행이라도 다녀오고 싶어
                </>,
            ],
        },
        SECOND_CARD: {
            [CARD_SELECTED_STATUS.TRUE]: [
                <>충전 한 번에 315km</>,
                <>
                    엔트리급 전기차의 주행거리 혁신
                    <br />한 번 충전으로 서울에서 강릉까지 왕복도 거뜬해요
                </>,
            ],
            [CARD_SELECTED_STATUS.FALSE]: [
                <>
                    평일에 너무 피곤했으니
                    <br />
                    오랜만에 동네 드라이브나 할래
                </>,
            ],
        },
    },
};
