import React, { memo } from "react";
import HyundaiLogo from "/public/assets/hyundai-logo.svg?react";

const LinkSection: React.FC = () => (
    <div className="flex gap-x-2.5 h-heading-4-medium">
        <a
            href="https://privacy.hyundai.com/overview/full-policy"
            target="_blank"
            rel="noreferrer noopener"
        >
            개인정보 처리 방침
        </a>
        <p>|</p>
        <a
            href="https://casper.hyundai.com/vehicles/electric/highlight"
            target="_blank"
            rel="noreferrer noopener"
            className="text-n-white"
        >
            캐스퍼 온라인
        </a>
    </div>
);

const InfoSection: React.FC = () => (
    <>
        <div className="flex gap-5">
            <p>사업자등록번호 : 101-81-09147</p>
            <p>대표이사 : 장재훈</p>
        </div>
        <div className="flex gap-5">
            <p>캐스퍼 고객센터 : 080-500-6000</p>
            <p>주소 : 서울시 서초구 헌릉로 12</p>
        </div>
        <p>COPYRIGHT © HYUNDAI MOTOR COMPANY, ALL RIGHTS RESERVED.</p>
    </>
);

function Footer() {
    return (
        <div className="w-full h-[266px] bg-black pl-[180px] py-[70px] snap-end">
            <div className="flex h-6 gap-[180px]">
                <HyundaiLogo fill="#ffffff" width={189} height={27} />
                <div className="flex flex-col gap-2.5 h-heading-4-regular text-[#949494]">
                    <LinkSection />
                    <InfoSection />
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
