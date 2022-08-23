import { useQuery } from '@apollo/client';

import { GetPostsRes, GetPostsVars } from '../../../types/models';
import { GET_POSTS } from '../queries/getPosts';

const useGetPostsQuery = (params?: GetPostsVars) => {
  const { perPage = 10, page = 0, sortField = 'createdAt', sortOrder = 'DESC' } = params || {};

  const { data, ...otherParams } = useQuery<GetPostsRes, GetPostsVars>(GET_POSTS, {
    variables: {
      ...params,
      perPage,
      page,
      sortField,
      sortOrder,
    },
  });

  const { allPosts = [] } = data || {};

  return {
    ...otherParams,
    data: allPosts,
  };
};

export default useGetPostsQuery;
