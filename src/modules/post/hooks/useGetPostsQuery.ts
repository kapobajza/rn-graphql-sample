import { useQuery } from '@apollo/client';

import { GET_POSTS } from '../queries/getPosts';

const useGetPostsQuery = (params: { page?: number; limit?: number } = { page: 1, limit: 10 }) => {
  return useQuery<
    { posts: { data: { id: string; title: string }[] } },
    { options: { paginate: { page?: number; limit?: number } } }
  >(GET_POSTS, {
    variables: {
      options: {
        paginate: params,
      },
    },
  });
};

export default useGetPostsQuery;
