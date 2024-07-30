export interface RushEventProps {
    id: number;
    date: string;
    image: string;
    prizeName: string;
}

export default function RushEvent({ date, image, prizeName }: RushEventProps) {
    return (
        <div className="relative w-[160px] h-[200px] py-7 px-5 rounded-500 bg-n-white flex flex-col gap-4 justify-between items-center border border-n-neutral-300">
            <p className="h-body-2-bold text-n-neutral-950 text-nowrap">{date}</p>
            <img src={image} alt="event prize" className="object-cover" />
            <p className="h-body-2-medium text-n-neutral-950 text-nowrap">{prizeName}</p>
        </div>
    );
}
