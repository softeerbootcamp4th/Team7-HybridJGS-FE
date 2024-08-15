export async function writeClipboard(
    text: string,
    successCallback?: () => void,
    errorCallback?: () => void
) {
    try {
        await navigator.clipboard.writeText(text);
        successCallback && successCallback();
    } catch (err) {
        console.error("Failed to copy: ", err);
        errorCallback && errorCallback();
    }
}
