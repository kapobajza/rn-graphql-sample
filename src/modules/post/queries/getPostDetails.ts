import { gql } from '@apollo/client';

export const GET_POST_DETAILS = gql`
  query GetPostDetails($id: ID!) {
    Post(id: $id) {
      id
      body
      title
      User {
        id
        name
        imageUrl
      }
    }
  }
`;
