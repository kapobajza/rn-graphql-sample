import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation ($title: String!, $body: String!, $createdAt: String!, $user_id: ID!) {
    createPost(title: $title, body: $body, createdAt: $createdAt, user_id: $user_id) {
      id
      title
      body
      createdAt
    }
  }
`;
