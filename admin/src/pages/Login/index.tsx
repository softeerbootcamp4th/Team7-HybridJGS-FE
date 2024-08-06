import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import Input from "@/components/Input";
import TabHeader from "@/components/TabHeader";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";

export default function Login() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    const { handleOpenModal, ModalComponent } = useModal();

    const [selectedDropdownIdx, setSelectedDropdownIdx] = useState(0);

    const headers = [
        "ID",
        "이벤트 진행 날짜",
        "오픈 시간",
        "종료 시간",
        "활성화 시간",
        "선택지 관리",
        "경품 관리",
        "선착순 당첨 인원 수",
        "진행 상태",
        <Dropdown
            options={["옵션 1 : 총 선택 인원 13,245", "옵션 2 : 총 선택 인원 10,182"]}
            selectedIdx={selectedDropdownIdx}
            handleClickOption={(idx: number) => setSelectedDropdownIdx(idx)}
        />,
        "관리",
    ];
    const data = new Array(20).fill(null).map(() => [
        7,
        "2024-07-19",
        "22:00:00",
        "22:10:00",
        "00시간 10분 00초",
        <Button type="sm">선택지 관리</Button>,
        <Button type="sm">경품 관리</Button>,
        <div className="flex justify-between">
            <p>315</p>
            <p>편집</p>
        </div>,
        "오픈 전",
        <Button type="sm">참여자 리스트 보기</Button>,
        <Button type="sm">삭제</Button>,
    ]);

    return (
        <>
            <Header />
            <TabHeader
                tabList={["캐스퍼 일렉트릭 봇 만들기 추첨 이벤트", "선착순 밸런스 게임 이벤트"]}
                selectedIdx={selectedIdx}
                handleClickTab={(idx) => setSelectedIdx(idx)}
            />
            <Button type="lg" onClick={handleOpenModal}>
                임시 저장
            </Button>
            <Button type="sm">임시 저장</Button>
            <Button type="lg" isValid={false}>
                임시 저장
            </Button>
            <Button type="sm" isValid={false}>
                임시 저장
            </Button>
            <Input
                value={value}
                onChange={(e) => setValue((e as ChangeEvent<HTMLInputElement>).target.value)}
            />
            <Input
                label="ID"
                value={value}
                onChange={(e) => setValue((e as ChangeEvent<HTMLInputElement>).target.value)}
            />

            <ModalComponent>
                <div className="w-[200px] h-[128px]">hihi</div>
            </ModalComponent>

            <Table headers={headers} data={data} />
        </>
    );
}
