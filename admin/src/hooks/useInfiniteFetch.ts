import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteListData } from "@/types/common";

interface UseInfiniteFetchProps<R> {
    fetch: (pageParam: number) => Promise<R>;
    initialPageParam?: number;
    getNextPageParam: (currentPageParam: number, lastPage: R) => number | undefined;
}

interface InfiniteScrollData<T> {
    data: T[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isLoading: boolean;
    isError: boolean;
}

export default function useInfiniteFetch<T>({
    fetch,
    initialPageParam,
    getNextPageParam,
}: UseInfiniteFetchProps<InfiniteListData<T>>): InfiniteScrollData<T> {
    const [data, setData] = useState<T[]>([]);
    const [currentPageParam, setCurrentPageParam] = useState<number | undefined>(initialPageParam);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    const fetchNextPage = useCallback(async () => {
        if (!hasNextPage || isLoading || currentPageParam === undefined) return;

        setIsLoading(true);
        try {
            const lastPage = await fetch(currentPageParam);
            const nextPageParam = getNextPageParam(currentPageParam, lastPage);
            console.log(lastPage);

            setData([...data, ...lastPage.data]);
            setCurrentPageParam(nextPageParam);
            setHasNextPage(nextPageParam !== undefined);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [fetch, getNextPageParam, currentPageParam, data, hasNextPage]);

    useEffect(() => {
        fetchNextPage();
    }, []);

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
    };
}
