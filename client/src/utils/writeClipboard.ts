export async function writeClipboard(
    text: string,
    successCallback?: () => void,
    errorCallback?: () => void
) {
    try {
        await navigator.clipboard.writeText(text);
        successCallback && successCallback();
    } catch (err) {
        errorCallback && errorCallback();
    }
}
