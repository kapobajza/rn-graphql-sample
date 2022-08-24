import { useInfiniteQuery } from '../../../hooks';
import { GetPostsRes, GetPostsVars } from '../../../types/models';
import { GET_POSTS } from '../queries/getPosts';

const PER_PAGE_LIMIT = 20;

const useGetPostsQuery = (params?: GetPostsVars) => {
  const {
    perPage = PER_PAGE_LIMIT,
    page = 0,
    sortField = 'createdAt',
    sortOrder = 'DESC',
  } = params || {};

  const { data, ...otherParams } = useInfiniteQuery<GetPostsRes, GetPostsVars>(GET_POSTS, {
    variables: {
      ...params,
      perPage,
      page,
      sortField,
      sortOrder,
    },
    getHasNextPageParam(res) {
      const { allPosts = [] } = res || {};
      return allPosts.length % PER_PAGE_LIMIT === 0;
    },
  });

  const { allPosts = [] } = data || {};

  return {
    ...otherParams,
    data: allPosts,
  };
};

export default useGetPostsQuery;
