import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import TabHeader from "@/components/TabHeader";

export default function Login() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    return (
        <>
            <Header />
            <TabHeader
                tabList={["캐스퍼 일렉트릭 봇 만들기 추첨 이벤트", "선착순 밸런스 게임 이벤트"]}
                selectedIdx={selectedIdx}
                handleClickTab={(idx) => setSelectedIdx(idx)}
            />
            <Button type="lg">임시 저장</Button>
            <Button type="sm">임시 저장</Button>
            <Button type="lg" isValid={false}>
                임시 저장
            </Button>
            <Button type="sm" isValid={false}>
                임시 저장
            </Button>
        </>
    );
}
