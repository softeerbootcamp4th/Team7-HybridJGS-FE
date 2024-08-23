import { ChangeEvent } from "react";

interface DatePickerProps {
    date: string;
    disabled?: boolean;
    onChangeDate: (date: string) => void;
}

export default function DatePicker({ date, disabled = false, onChangeDate }: DatePickerProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeDate(e.target.value);
    };

    return (
        <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img alt="달력 아이콘" src="/assets/icons/calendar.svg" />
            </div>
            <input
                type="date"
                disabled={disabled}
                value={date}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Select date"
            />
        </div>
    );
}
