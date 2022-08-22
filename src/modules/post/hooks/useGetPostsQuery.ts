import { useQuery } from '@apollo/client';

import { GetPostsRes, GetPostsVars, Paginate } from '../../../types/models';
import { GET_POSTS } from '../queries/getPosts';

const useGetPostsQuery = (params: Paginate = { page: 1, limit: 10 }) => {
  const { data, ...otherParams } = useQuery<GetPostsRes, GetPostsVars>(GET_POSTS, {
    variables: {
      options: {
        paginate: params,
        sort: {
          field: 'title',
          order: 'ASC',
        },
      },
    },
  });

  const { posts: { data: posts = [] } = { data: [] } } = data || {};

  return {
    ...otherParams,
    data: posts,
  };
};

export default useGetPostsQuery;
