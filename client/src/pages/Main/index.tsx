import CTAButton from "@/components/CTAButton";

export default function Main() {
    return (
        <div className="flex pt-48">
            <CTAButton
                label="외부링크"
                color="blue"
                disabled={false}
                shareIcon={true}
                url="https://casper.hyundai.com/vehicles/electric/highlight"
            />
            <CTAButton
                label="내부링크"
                color="blue"
                disabled={false}
                shareIcon={true}
                url="/lottery"
            />
        </div>
    );
}
