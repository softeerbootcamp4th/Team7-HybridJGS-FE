import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function useFetch<T, P = void>(fetch: (params: P) => Promise<T>, showError = true) {
    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showBoundary } = useErrorBoundary();

    const fetchData = async (params?: P) => {
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);

        try {
            const data = await fetch(params as P);
            setData(data);
            setIsSuccess(!!data);
        } catch (error) {
            setIsError(true);
            if (showError) {
                showBoundary(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isSuccess, isError, isLoading, fetchData };
}
