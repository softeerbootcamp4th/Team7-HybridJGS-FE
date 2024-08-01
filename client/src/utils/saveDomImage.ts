import domToImage from "dom-to-image";

interface SaveDomImageProps {
    casperCustomDom: HTMLDivElement;
    casperName: string;
}

export async function saveDomImage({ casperCustomDom, casperName }: SaveDomImageProps) {
    if (!casperCustomDom) {
        return;
    }

    try {
        const pngDataUrl = await domToImage.toPng(casperCustomDom);

        const link = document.createElement("a");
        link.download = `casper-${casperName}.png`;
        link.href = pngDataUrl;
        link.click();
    } catch (error) {
        console.error("Failed to save image:", error);
    }
}
