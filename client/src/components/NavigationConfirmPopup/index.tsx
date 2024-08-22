import { buttonStyles } from "./index.style";

interface NavigationConfirmPopup {
    handleConfirm: () => void;
    handleClose: () => void;
}

export default function NavigationConfirmPopup({
    handleConfirm,
    handleClose,
}: NavigationConfirmPopup) {
    return (
        <div className="fixed w-full h-full left-0 top-0 z-20">
            <div
                className="absolute left-0 top-0 w-[100%] h-[100%] bg-n-black/[.4]"
                onClick={handleClose}
            />
            <div className="px-[50px] py-1000 bg-n-white rounded-600 absolute left-[50%] top-[40%] translate-y-[-50%] translate-x-[-50%]">
                <p className="h-body-1-regular">
                    이 페이지를 떠나면 모든 변경 사항이 저장되지 않습니다.
                    <br />
                    페이지를 떠나시겠습니까?
                </p>

                <div className="flex gap-500 mt-800">
                    <button className={buttonStyles({ variant: "primary" })} onClick={handleClose}>
                        아니요
                    </button>
                    <button
                        className={buttonStyles({ variant: "secondary" })}
                        onClick={handleConfirm}
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
}
