import { Paginate } from './Paginate';
import { User } from './User';

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface GetPosts {
  posts: { data: Post[] };
  meta: { totalCount: number };
}

export interface GetPostsOpts {
  options: { paginate: Paginate };
}
