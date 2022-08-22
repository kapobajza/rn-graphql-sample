import { useMutation } from '@apollo/client';

import { CreatePostVars, Post } from '../../../types/models';
import { CREATE_POST } from '../queries/createPost';

const useCreatePostMutation = () => {
  return useMutation<Post, CreatePostVars>(CREATE_POST);
};

export default useCreatePostMutation;
