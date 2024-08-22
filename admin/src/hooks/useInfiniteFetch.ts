import { useCallback, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { isInfiniteExpectationListData, isInfiniteParticipantListData } from "@/utils/typeguard";

interface UseInfiniteFetchProps<R> {
    fetch: (pageParam: number) => Promise<R>;
    initialPageParam?: number;
    getNextPageParam: (currentPageParam: number, lastPage: R) => number | undefined;
    startFetching?: boolean;
    showError?: boolean;
}

interface InfiniteScrollData<T> {
    data: T[];
    totalLength: number;
    fetchNextPage: () => void;
    refetch: () => void;
    hasNextPage: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorStatus: string | null;
}

export default function useInfiniteFetch<T, R>({
    fetch,
    initialPageParam = 0,
    getNextPageParam,
    startFetching = true,
    showError = true,
}: UseInfiniteFetchProps<R>): InfiniteScrollData<T> {
    const { showBoundary } = useErrorBoundary();

    const [data, setData] = useState<T[]>([]);
    const [currentPageParam, setCurrentPageParam] = useState<number | undefined>(initialPageParam);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<string | null>(null);

    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [totalLength, setTotalLength] = useState<number>(0);

    const getDataList = useCallback((lastPage: R) => {
        if (isInfiniteParticipantListData<T>(lastPage)) {
            setTotalLength(lastPage.totalParticipants);
            return lastPage.participantsList;
        } else if (isInfiniteExpectationListData<T>(lastPage)) {
            setTotalLength(lastPage.totalExpectations);
            return lastPage.expectations;
        }

        return [];
    }, []);

    const fetchNextPage = useCallback(async () => {
        if (!hasNextPage || isLoading || currentPageParam === undefined) return;

        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        setErrorStatus(null);
        try {
            const lastPage = await fetch(currentPageParam);
            const nextPageParam = getNextPageParam(currentPageParam, lastPage);

            setData([...data, ...getDataList(lastPage)]);
            setCurrentPageParam(nextPageParam);
            setHasNextPage(nextPageParam !== undefined);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setIsSuccess(false);
            if (error instanceof Error) {
                setErrorStatus(error.message);
            }
            if (showError) {
                showBoundary(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [fetch, getNextPageParam, currentPageParam, data, hasNextPage]);

    const refetch = useCallback(async () => {
        setCurrentPageParam(initialPageParam);
        setData([]);
        setHasNextPage(true);
        setTotalLength(0);
    }, []);

    useEffect(() => {
        if (startFetching && currentPageParam === initialPageParam) {
            fetchNextPage();
        }
    }, [startFetching, currentPageParam]);

    return {
        data,
        totalLength,
        fetchNextPage,
        refetch,
        hasNextPage,
        isSuccess,
        isError,
        errorStatus,
    };
}
