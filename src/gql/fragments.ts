import { gql } from "@apollo/client";

export const PLAYER_FIELDS_WITH_FRIENDS = gql`
  fragment PlayerFieldsWithFriends on Player {
    __typename
    email
    id
    nickname
    tag
    createdAt
    updatedAt
    picture
    friendRequests {
      id
      nickname
      tag
      picture
    }
    friends {
      id
      nickname
      tag
      createdAt
      updatedAt
      picture
    }
  }
`;
