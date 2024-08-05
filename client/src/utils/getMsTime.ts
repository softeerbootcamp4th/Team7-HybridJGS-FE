export function getMsTime(dateString: string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.error(`Invalid date string: ${dateString}`);
        return -1;
    }

    return date.getTime();
}
