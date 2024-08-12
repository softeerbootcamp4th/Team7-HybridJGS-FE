export function getDateDifference(startDate: string, endDate: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!startDate || !endDate || !startDate.match(dateRegex) || !endDate.match(dateRegex)) {
        return "";
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return `${differenceInDays}일`;
}
