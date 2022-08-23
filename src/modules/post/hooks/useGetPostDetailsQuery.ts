import { useQuery } from '@apollo/client';

import { GetPostDetailsRes, GetPostDetailsVars } from '../../../types/models';
import { GET_POST_DETAILS } from '../queries/getPostDetails';

const useGetPostDetailsQuery = (id: string) => {
  const { data, ...otherParams } = useQuery<GetPostDetailsRes, GetPostDetailsVars>(
    GET_POST_DETAILS,
    {
      variables: {
        id,
      },
    },
  );

  const { Post: post } = data || {};

  return {
    ...otherParams,
    data: post,
  };
};

export default useGetPostDetailsQuery;
