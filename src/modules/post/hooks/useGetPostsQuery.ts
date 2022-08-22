import { useQuery } from '@apollo/client';

import { GetPosts, GetPostsOpts, Paginate } from '../../../types/models';
import { GET_POSTS } from '../queries/getPosts';

const useGetPostsQuery = (params: Paginate = { page: 1, limit: 10 }) => {
  const { data, ...otherParams } = useQuery<GetPosts, GetPostsOpts>(GET_POSTS, {
    variables: {
      options: {
        paginate: params,
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
