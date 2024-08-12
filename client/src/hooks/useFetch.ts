import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function useFetch<T, P = void>(fetch: (params: P) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const { showBoundary } = useErrorBoundary();

    const fetchData = async (params?: P) => {
        setIsError(false);
        setIsSuccess(false);

        try {
            const data = await fetch(params as P);
            setData(data);
            setIsSuccess(!!data);
        } catch (error) {
            showBoundary(error);
            setIsError(true);
            console.error(error);
        }
    };

    return { data, isSuccess, isError, fetchData };
}
