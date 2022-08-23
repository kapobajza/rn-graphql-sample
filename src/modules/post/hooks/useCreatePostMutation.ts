import { useMutation } from '../../../hooks';
import { CreatePostVars, Post } from '../../../types/models';
import { CREATE_POST } from '../queries/createPost';
import { GET_POSTS_NAME } from '../queries/getPosts';

const useCreatePostMutation = () => {
  return useMutation<Post, CreatePostVars>(CREATE_POST, {
    refetchQueries: [GET_POSTS_NAME],
  });
};

export default useCreatePostMutation;
