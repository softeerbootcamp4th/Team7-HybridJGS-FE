import { useState } from "react";
import { useCookies } from "react-cookie";
import { useErrorBoundary } from "react-error-boundary";
import { COOKIE_KEY } from "@/constants/cookie";

export default function useFetch<T, P = void>(
    fetch: (params: P, token?: string) => Promise<T>,
    showError = true
) {
    const { showBoundary } = useErrorBoundary();

    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const fetchData = async (params?: P) => {
        setIsError(false);
        setIsSuccess(false);

        try {
            const data = await fetch(params as P, cookies[COOKIE_KEY.ACCESS_TOKEN]);
            setData(data);
            setIsSuccess(!!data);
        } catch (error) {
            setIsError(true);
            console.error(error);
            if (showError) {
                showBoundary(error);
            }
        }
    };

    return { data, isSuccess, isError, fetchData };
}
