import { useState } from "react";

export default function useFetch<T, P = void>(fetch: (params: P) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchData = async (params?: P) => {
        try {
            console.log("hohi");
            const data = await fetch(params as P);
            console.log(data);
            setData(data);
            setIsSuccess(!!data);
        } catch (error) {
            setIsError(true);
            console.error(error);
        }
    };

    return { data, isSuccess, isError, fetchData };
}
