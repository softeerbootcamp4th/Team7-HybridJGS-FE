export interface ToggleProps {
    leftText: string;
    rightText: string;
}

export default function Toggle({ leftText, rightText }: ToggleProps) {
    return (
        <div className="bg-n-white rounded-700 p-300 flex">
            <div>
                <p className="h-body-2-bold">{leftText}</p>
            </div>
            <div>
                <p className="h-body-2-bold">{rightText}</p>
            </div>
        </div>
    );
}
