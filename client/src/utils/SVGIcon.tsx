import { useEffect, useState } from "react";

interface SVGIconProps {
    src: string;
    stroke: string;
}

export default function SVGIcon({ src, stroke }: SVGIconProps) {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndModifySVG = async () => {
            try {
                const response = await fetch(src);
                const text = await response.text();
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(text, "image/svg+xml");
                const svgElement = svgDoc.documentElement;

                svgElement.querySelectorAll("[stroke]").forEach((el) => {
                    el.setAttribute("stroke", stroke);
                });

                const svgString = new XMLSerializer().serializeToString(svgElement);
                setSvgContent(svgString);
            } catch (error) {
                console.error("Error: ", error);
            }
        };
        fetchAndModifySVG();
    }, [src, stroke]);

    return svgContent ? <span dangerouslySetInnerHTML={{ __html: svgContent }} /> : null;
}
