import {
  DocumentNode,
  NetworkStatus,
  OperationVariables,
  TypedDocumentNode,
  useQuery as useQueryApollo,
} from '@apollo/client';
import { useMemo } from 'react';

import { QueryOptions, UseQueryResult } from './types';

const useQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryOptions<TData, TVariables>,
): UseQueryResult<TData, TVariables> => {
  const { networkStatus, ...otherParams } = useQueryApollo(query, {
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  const initialLoading = useMemo(() => networkStatus === NetworkStatus.loading, [networkStatus]);
  const isRefetching = useMemo(() => networkStatus === NetworkStatus.refetch, [networkStatus]);

  return {
    ...otherParams,
    networkStatus,
    initialLoading,
    isRefetching,
  };
};

export default useQuery;
