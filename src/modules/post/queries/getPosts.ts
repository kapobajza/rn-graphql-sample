import { gql } from '@apollo/client';

export const GET_POSTS_NAME = 'GetPosts';

export const GET_POSTS = gql`
  query ${GET_POSTS_NAME}($page: Int, $perPage: Int, $sortField: String, $sortOrder: String) {
    allPosts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder) {
      id
      title
      body
      User {
        id
        name
        imageUrl
      }
    }
  }
`;
