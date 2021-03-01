import gql from "graphql-tag";

export const FETCH_ALL_POSTS = gql`
  {
    getPosts {
      id
      body
      userName
      createdAt
      comments {
        id
        createdAt
        body
        userName
      }
      likes {
        userName
      }
      likeCount
      commentCount
    }
  }
`;
