export const PHONE_NUMBER_FORMAT = /(\d{3})-(\d{4})-(\d{4})/;

export function formatPhoneNumber(value: string) {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length !== 11) {
        return phoneNumber;
    }

    const formattedPhoneNumber = phoneNumber.replace(
        /(\d{3})(\d{4})(\d{4})/,
        (_, p1, p2, p3) => `${p1}-${p2}-${p3}`
    );

    return formattedPhoneNumber;
}
