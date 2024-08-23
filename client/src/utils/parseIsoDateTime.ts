export default function parseIsoDateTime(dateTime: string) {
    return new Date(dateTime).toISOString().split("T")[0];
}
