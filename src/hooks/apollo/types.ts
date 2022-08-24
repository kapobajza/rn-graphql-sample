import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
} from '@apollo/client';

export interface QueryOptions<TData = any, TVariables = OperationVariables>
  extends QueryHookOptions<TData, TVariables> {}

export interface UseQueryResult<TData = any, TVariables = OperationVariables>
  extends QueryResult<TData, TVariables> {
  initialLoading: boolean | undefined;
  isRefetching: boolean | undefined;
}

export interface InfiniteQueryOptions<TData = any, TVariables = OperationVariables>
  extends QueryHookOptions<TData, TVariables> {
  getHasNextPageParam?: (data: TData | undefined, vars: TVariables | undefined) => boolean;
}

export type FetchMoreOptions<TFetchData, TFetchVars> = FetchMoreQueryOptions<
  TFetchVars,
  TFetchData
> & {
  updateQuery?: (
    previousQueryResult: TFetchData,
    options: {
      fetchMoreResult: TFetchData;
      variables: TFetchVars;
    },
  ) => TFetchData;
};

export interface UseInfiniteQueryResult<TData = any, TVariables = OperationVariables>
  extends UseQueryResult<TData, TVariables> {
  fetchNextPage<TFetchData = TData, TFetchVars = TVariables>(
    options?: FetchMoreOptions<TFetchData, TFetchVars>,
  ): Promise<ApolloQueryResult<TFetchData> | undefined>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
}
