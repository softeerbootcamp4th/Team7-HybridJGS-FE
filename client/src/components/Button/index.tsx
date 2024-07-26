import "@/index.css";

export interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-[184px] h-[60px] py-3 px-6 text-n-white rounded-[48px] border border-n-white bg-n-white bg-opacity-25 hover:bg-opacity-40 flex justify-center items-center h-body-1-bold !font-['HyundaiSansHeadOffice-Bold'] !leading-6"
        >
            {label}
        </button>
    );
}
