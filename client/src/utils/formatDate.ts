import { EventDateData, EventType } from "@/components/Notice";

const LOADING_DATE_MESSAGE = "날짜를 불러오는 중입니다...";

export const parseDate = (dateString: string): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

export const getFormattedDateComponents = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = DAY_OF_WEEK[date.getDay()];

    return { year, month, day, dayOfWeek };
};

export const formatDateWithSlash = (date: Date): string => {
    const { month, day, dayOfWeek } = getFormattedDateComponents(date);
    return `${month}/${day} (${dayOfWeek})`;
};

export const formatDateWithDot = (date: Date): string => {
    const { year, month, day, dayOfWeek } = getFormattedDateComponents(date);
    return `${year}. ${month}. ${day}. (${dayOfWeek})`;
};

export const formatDateWithDotNoDayOfWeek = (date: Date): string => {
    const { year, month, day } = getFormattedDateComponents(date);
    return `${year}. ${month}. ${day}.`;
};

export const formatSingleDateWithSlash = (dateString: string): string => {
    const date = parseDate(dateString);
    if (!date) return LOADING_DATE_MESSAGE;

    return formatDateWithSlash(date);
};

export const formatSingleDateWithDot = (dateString: string): string => {
    const date = parseDate(dateString);
    if (!date) return LOADING_DATE_MESSAGE;

    return formatDateWithDot(date);
};

export const formatEventDateRangeWithDot = (
    startDateString: string,
    endDateString: string
): string => {
    const startDate = parseDate(startDateString);
    const endDate = parseDate(endDateString);

    if (!startDate || !endDate) return LOADING_DATE_MESSAGE;

    const startFormatted = formatDateWithDot(startDate);
    const endFormatted = formatDateWithDot(endDate);

    return `${startFormatted} ~ ${endFormatted}`;
};

export const formatEventDateRangeWithDotNoDayOfWeek = (
    startDateString: string,
    endDateString: string
): string => {
    const startDate = parseDate(startDateString);
    const endDate = parseDate(endDateString);

    if (!startDate || !endDate) return LOADING_DATE_MESSAGE;

    const startFormatted = formatDateWithDotNoDayOfWeek(startDate);
    const endFormatted = formatDateWithDotNoDayOfWeek(endDate);

    return `${startFormatted} ~ ${endFormatted}`;
};

export const formatEventDate = (
    eventName: string,
    eventKey: EventType,
    eventDateDetails: EventDateData
) => {
    const event = eventDateDetails[eventKey];
    if (event && event.startDate && event.endDate) {
        return `${eventName} : ${formatEventDateRangeWithDotNoDayOfWeek(event.startDate, event.endDate)} (${event.activePeriod}일)`;
    }
    return `${eventName} : ${LOADING_DATE_MESSAGE}`;
};
