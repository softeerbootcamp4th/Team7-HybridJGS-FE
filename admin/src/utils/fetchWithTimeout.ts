export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;

    const response = await fetch(url, options);
    clearTimeout(id);

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }

    return response;
}
