import { useState } from "react";
import { useCookies } from "react-cookie";
import { useErrorBoundary } from "react-error-boundary";
import { COOKIE_KEY } from "@/constants/cookie";

export default function useFetchMultiple<T, P>(
    fetch: (params: P, token: string) => Promise<T>,
    showError = true
) {
    const { showBoundary } = useErrorBoundary();

    const [results, setResults] = useState<(T | null)[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [cookies] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const fetchMultiple = async (paramsArray: P[]) => {
        setIsSuccess(false);
        setIsError(false);

        const token = cookies[COOKIE_KEY.ACCESS_TOKEN];

        try {
            const results = await Promise.allSettled(
                paramsArray.map((params) => fetch(params, token))
            );

            const processedResults = results.map((result) =>
                result.status === "fulfilled" ? result.value : null
            );

            setResults(processedResults);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            if (showError) {
                showBoundary(error);
            }
        }
    };

    return { results, isSuccess, isError, fetchMultiple };
}
