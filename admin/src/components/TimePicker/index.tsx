import { ChangeEvent } from "react";

interface TimePickerProps {
    time: string;
    disabled?: boolean;
    onChangeTime: (time: string) => void;
}

export default function TimePicker({ time, disabled = false, onChangeTime }: TimePickerProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        /**
         * 시간-분 까지만 선택 가능
         * 초는 0초를 디폴트로 넣는다
         */
        const value = e.target.value;
        const isMinuteEnd = value.split(":").length === 2;
        const time = `${e.target.value}${isMinuteEnd ? `:00` : ""}`;
        onChangeTime(time);
    };

    return (
        <div className="max-w-[8rem] mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    type="time"
                    id="time"
                    disabled={disabled}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    min="09:00"
                    max="18:00"
                    value={time}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
    );
}
