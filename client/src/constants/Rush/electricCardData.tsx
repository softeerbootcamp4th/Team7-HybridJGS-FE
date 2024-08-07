export const TOGGLE_OPTIONS = [
    "혜택이 늘어요",
    "충전소가 늘어요",
    "유지비가 줄어요",
    "환경오염이 줄어요",
    "소음이 줄어요",
];

export const CARD_DATA = [
    {
        image: "/assets/rush/electric/pollution.jpg",
        title: (
            <>
                <p>대기오염환경법에 따른 </p>
                <p className="text-s-blue">저공해차량 1종 혜택</p>
            </>
        ),
        description: [
            "전기차는 대기오염물질을 배출하지 않기 때문에 대기오염환경법에 따른 저공해차량 1종으로 분류돼요.",
            "저공해차량 1종은 공영주차장과 비용과 고속도로 통행료 50% 할인 등의 혜택을 받을 수 있어요.",
        ],
    },
    {
        image: "/assets/rush/electric/e-csp.jpg",
        title: (
            <>
                <p className="text-s-blue">E-CSP: </p>
                <p>클릭 한 번으로 충전소가 내 손안에</p>
            </>
        ),
        description: [
            "현대자동차의 E-CSP(E-pit Charging Service Platform), 전기차 충전의 게임체인저!",
            "E-pit의 회원이기만 하면 제휴 충전소에서 별도의 인증 없이 자유롭게 안정적인 충전 서비스를 이용 가능해요.",
            "현대자동차는 양질의 충전 인프라 확대로 전기차 이용 고객의 편의가 향상되는 선순환을 지향하고 있어요.",
        ],
    },
    {
        image: "/assets/rush/electric/charge.jpg",
        title: <p>주유 대신 충전으로 연료비 절감</p>,
        description: [
            "전기차는 배터리를 충전하여 전기에너지로 바퀴를 굴리는 자동차에요.",
            "주유소에 가서 주유하는 대신에 충전소에서 충전하면 연료비가 1/3로 줄어요.",
            "(가솔린 연비 15km 기준)",
        ],
    },
    {
        image: "/assets/rush/electric/eco-friendly.jpg",
        title: (
            <>
                <p>화석연료 대신 </p>
                <p className="text-s-blue">친환경 에너지</p>
                <p>로</p>
            </>
        ),
        description: [
            "최신 전기차는 400V/800V 급속 충전 기술을 갖추어 충전 시간을 단축하고 더 긴 거리를 주행할 수 있답니다.",
            "V2G(Vehicle-to-Grid) 기술을 통해 차량 배터리에 저장된 전기를 전력망에 판매할 수 있어,",
            "전력망의 안정성을 높이고 화석연료 의존도를 줄이는 데 기여해 환경오염을 줄일 수 있어요.",
        ],
    },
    {
        image: "/assets/rush/electric/ranc.jpg",
        title: (
            <>
                <p>노면소음을 줄이는 </p>
                <p className="text-s-blue">RANC 기술</p>
            </>
        ),
        description: [
            "현대차는 능동형 소음 저감 기술(ANC)을 넘어 노면소음을 줄이는 RANC(Road-noise Active Noise Control) 기술을 개발했어요.",
            "RANC는 특히 저주파 대의 노면소음을 효과적으로 줄이며,",
            "포장된 지 오래된 아스팔트 노면이나 교량 연결부의 소음을 약 3dB 감소시켜 소음 에너지를 절반 수준으로 낮춘답니다.",
        ],
    },
];
