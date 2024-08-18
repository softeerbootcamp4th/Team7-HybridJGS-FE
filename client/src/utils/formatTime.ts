export function formatTime(time: number, length: number = 2, padChar: string = "0") {
    return time.toString().padStart(length, padChar);
}
