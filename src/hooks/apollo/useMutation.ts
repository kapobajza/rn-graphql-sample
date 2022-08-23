import {
  ApolloCache,
  DefaultContext,
  DocumentNode,
  FetchResult,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  TypedDocumentNode,
  useMutation as useMutationApollo,
} from '@apollo/client';

import { useFlashMessage } from '../../components/FlashMessage';
import { useTranslation } from '../../translation/Provider';

const useMutation = <
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>,
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext>,
): MutationTuple<TData, TVariables, TContext, TCache> => {
  const { showError } = useFlashMessage();
  const { strings } = useTranslation();
  const [mutationFn, res] = useMutationApollo(mutation, options);

  const newMutationFn = async (
    params?: MutationFunctionOptions<TData, TVariables, TContext, ApolloCache<any>> | undefined,
  ) => {
    let result: FetchResult<TData, Record<string, any>, Record<string, any>> | undefined;

    try {
      result = await mutationFn(params);
    } catch (err) {
      showError(err.message || strings.errorsGeneralMessage);
    }

    return result;
  };

  return [newMutationFn, res] as MutationTuple<TData, TVariables, TContext, TCache>;
};

export default useMutation;
