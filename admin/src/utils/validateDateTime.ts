export function validateDateTime(
    key: string,
    startDateTime: number,
    endDateTime: number,
    currentDateTime: number
) {
    if (key === "startDate" || key === "startTime") {
        if (startDateTime < currentDateTime) {
            return "시작 날짜와 시간은 현재 시간보다 빠를 수 없습니다!";
        }
        if (startDateTime > endDateTime) {
            return "시작 날짜와 시간이 종료 날짜와 시간보다 느릴 수 없습니다!";
        }
    }

    if (key === "endDate" || key === "endTime") {
        if (endDateTime < startDateTime) {
            return "종료 날짜와 시간이 시작 날짜와 시간보다 빠를 수 없습니다!";
        }
        if (endDateTime < currentDateTime) {
            return "종료 날짜와 시간은 현재 시간보다 빠를 수 없습니다!";
        }
    }

    return null;
}
