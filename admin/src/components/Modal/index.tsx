import { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
    handleClose: () => void;
}

export default function Modal({ handleClose, children }: ModalProps) {
    return (
        <div className="fixed w-full h-full left-0 top-0 z-20">
            <div
                className="absolute left-0 top-0 w-[100%] h-[100%] bg-black/[.4]"
                onClick={handleClose}
            />
            <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white p-[80px] rounded-3xl">
                {children}

                <button onClick={handleClose}>
                    <img
                        className="absolute right-[32px] top-[32px]"
                        alt="모달 닫기 버튼"
                        src="/assets/icons/close.svg"
                    />
                </button>
            </div>
        </div>
    );
}
