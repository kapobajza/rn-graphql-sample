import { gql } from '@apollo/client';

export const GET_POST_DETAILS = gql`
  query GetPostDetails($id: ID!) {
    post(id: $id) {
      id
      body
      title
      user {
        id
        name
      }
    }
  }
`;
