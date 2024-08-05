import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import TabHeader from "@/components/TabHeader";
import useModal from "@/hooks/useModal";

export default function Login() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const [value, setValue] = useState<string>("");

    const { handleOpenModal, ModalComponent } = useModal();

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
        </>
    );
}
