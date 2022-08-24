import {
  ApolloQueryResult,
  DocumentNode,
  NetworkStatus,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client';
import { useCallback, useMemo, useRef } from 'react';

import { FetchMoreOptions, InfiniteQueryOptions, UseInfiniteQueryResult } from './types';
import useQuery from './useQuery';

const useInfiniteQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: InfiniteQueryOptions<TData, TVariables>,
): UseInfiniteQueryResult<TData, TVariables> => {
  const currentPage = useRef(1);
  const { getHasNextPageParam, ...otherQueryOptions } = options || {};

  const {
    fetchMore,
    data,
    variables,
    networkStatus,
    refetch: defaultRefetch,
    ...otherParams
  } = useQuery(query, otherQueryOptions);

  const hasNextPage = useMemo(
    () => getHasNextPageParam?.(data, variables),
    [data, getHasNextPageParam, variables],
  );

  const fetchNextPage = useCallback(
    async <TFetchData = TData, TFetchVars = TVariables>(
      fetchOptions?: FetchMoreOptions<TFetchData, TFetchVars>,
    ) => {
      let res: ApolloQueryResult<TFetchData> | undefined;

      if (hasNextPage) {
        res = await fetchMore<TFetchData, TFetchVars>({
          ...fetchOptions,
          variables: {
            ...(fetchOptions?.variables || {}),
            page: currentPage.current,
          },
        } as FetchMoreOptions<any, any>);

        currentPage.current = currentPage.current + 1;
      }

      return res;
    },
    [fetchMore, hasNextPage],
  );

  const isFetchingNextPage = useMemo(
    () => networkStatus === NetworkStatus.fetchMore,
    [networkStatus],
  );

  const refetch = (refetchVars?: Partial<TVariables>) => {
    currentPage.current = 1;
    return defaultRefetch(refetchVars);
  };

  return {
    ...otherParams,
    fetchMore,
    fetchNextPage,
    data,
    variables,
    hasNextPage,
    isFetchingNextPage,
    networkStatus,
    refetch,
  };
};

export default useInfiniteQuery;
