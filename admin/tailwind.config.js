/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const fontUtilities = {
                ".h-heading-1-bold": {
                    fontSize: "64px",
                    lineHeight: "80px",
                    letterSpacing: "-2.56px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-heading-1-medium": {
                    fontSize: "64px",
                    lineHeight: "80px",
                    letterSpacing: "-2.56px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-heading-1-regular": {
                    fontSize: "64px",
                    lineHeight: "80px",
                    letterSpacing: "-2.56px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-heading-2-bold": {
                    fontSize: "40px",
                    lineHeight: "56px",
                    letterSpacing: "-1.6px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-heading-2-medium": {
                    fontSize: "40px",
                    lineHeight: "56px",
                    letterSpacing: "-1.6px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-heading-2-regular": {
                    fontSize: "40px",
                    lineHeight: "56px",
                    letterSpacing: "-1.6px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-heading-3-bold": {
                    fontSize: "27px",
                    lineHeight: "42px",
                    letterSpacing: "-1.08px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-heading-3-medium": {
                    fontSize: "27px",
                    lineHeight: "42px",
                    letterSpacing: "-1.08px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-heading-3-regular": {
                    fontSize: "27px",
                    lineHeight: "42px",
                    letterSpacing: "-1.08px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-heading-4-bold": {
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "-0.64px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-heading-4-medium": {
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "-0.64px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-heading-4-regular": {
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "-0.64px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-body-1-bold": {
                    fontSize: "17px",
                    lineHeight: "26px",
                    letterSpacing: "-0.68px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-body-1-medium": {
                    fontSize: "17px",
                    lineHeight: "26px",
                    letterSpacing: "-0.68px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-body-1-regular": {
                    fontSize: "17px",
                    lineHeight: "26px",
                    letterSpacing: "-0.68px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-body-2-bold": {
                    fontSize: "14px",
                    lineHeight: "22px",
                    letterSpacing: "-0.56px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-body-2-medium": {
                    fontSize: "14px",
                    lineHeight: "22px",
                    letterSpacing: "-0.56px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-body-2-regular": {
                    fontSize: "14px",
                    lineHeight: "22px",
                    letterSpacing: "-0.56px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
                ".h-detail-1-bold": {
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "-0.4px",
                    fontFamily: "HyundaiSansTextOffice-Bold, sans-serif",
                },
                ".h-detail-1-medium": {
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "-0.4px",
                    fontFamily: "HyundaiSansTextOffice-Medium, sans-serif",
                },
                ".h-detail-1-regular": {
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "-0.4px",
                    fontFamily: "HyundaiSansTextOffice-Regular, sans-serif",
                },
            };
            addUtilities(fontUtilities);
        },
    ],
};
