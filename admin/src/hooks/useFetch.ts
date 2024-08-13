import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function useFetch<T, P = void>(fetch: (params: P) => Promise<T>) {
    const { showBoundary } = useErrorBoundary();

    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchData = async (params?: P) => {
        setIsError(false);
        setIsSuccess(false);

        try {
            const data = await fetch(params as P);
            setData(data);
            setIsSuccess(!!data);
        } catch (error) {
            setIsError(true);
            showBoundary(error);
            console.error(error);
        }
    };

    return { data, isSuccess, isError, fetchData };
}
