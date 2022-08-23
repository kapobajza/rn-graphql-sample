import { Paginate } from './Paginate';
import { User } from './User';

export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  User: User;
}

export interface GetPostsRes {
  allPosts: Post[];
}

export type GetPostsVars = Paginate<Post>;

export interface GetPostDetailsRes {
  Post: Post;
}

export interface GetPostDetailsVars {
  id: string;
}

export interface CreatePostVars {
  title: string;
  body: string;
  createdAt: string;
  user_id: string;
}
