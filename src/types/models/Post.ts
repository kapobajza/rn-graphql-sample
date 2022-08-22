import { Paginate } from './Paginate';
import { User } from './User';

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface GetPostsRes {
  posts: { data: Post[] };
  meta: { totalCount: number };
}

export interface GetPostsVars {
  options: { paginate: Paginate };
}

export interface GetPostDetailsRes {
  post: Post;
}

export interface GetPostDetailsVars {
  id: string;
}
