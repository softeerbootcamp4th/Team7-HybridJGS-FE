export function getMsTime(dateString: string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return -1;
    }

    return date.getTime();
}
