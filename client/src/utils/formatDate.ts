export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.error(`Invalid date string: ${dateString}`);
        return;
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
    const today = DAY_OF_WEEK[date.getDay()];
    return `${month}/${day} (${today})`;
};
