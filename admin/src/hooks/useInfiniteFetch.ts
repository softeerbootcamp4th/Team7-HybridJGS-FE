import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { InfiniteListData } from "@/types/common";

interface UseInfiniteFetchProps<R> {
    fetch: (pageParam: number) => Promise<R>;
    initialPageParam?: number;
    getNextPageParam: (currentPageParam: number, lastPage: R) => number | undefined;
    startFetching?: boolean;
}

interface InfiniteScrollData<T> {
    data: T[];
    fetchNextPage: () => void;
    refetch: () => void;
    hasNextPage: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export default function useInfiniteFetch<T>({
    fetch,
    initialPageParam,
    getNextPageParam,
    startFetching = true,
}: UseInfiniteFetchProps<InfiniteListData<T>>): InfiniteScrollData<T> {
    const [data, setData] = useState<T[]>([]);
    const [currentPageParam, setCurrentPageParam] = useState<number | undefined>(initialPageParam);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    const fetchNextPage = useCallback(async () => {
        if (!hasNextPage || isLoading || currentPageParam === undefined) return;

        setIsLoading(true);
        try {
            const lastPage = await fetch(currentPageParam);
            const nextPageParam = getNextPageParam(currentPageParam, lastPage);

            setData([...data, ...lastPage.data]);
            setCurrentPageParam(nextPageParam);
            setHasNextPage(nextPageParam !== undefined);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }, [fetch, getNextPageParam, currentPageParam, data, hasNextPage]);

    const refetch = useCallback(async () => {
        flushSync(() => {
            setCurrentPageParam(initialPageParam);
            setData([]);
        });
        fetchNextPage();
    }, [fetchNextPage]);

    useEffect(() => {
        if (startFetching) {
            fetchNextPage();
        }
    }, [startFetching]);

    return {
        data,
        fetchNextPage,
        refetch,
        hasNextPage,
        isSuccess,
        isError,
    };
}
