import { gql } from "@apollo/client";

export const PLAYER_FIELDS_WITH_FRIENDS = gql`
  fragment PlayerFieldsWithFriends on Player {
    __typename
    nickname
    tag
    createdAt
    updatedAt
    picture
    friends {
      nickname
      tag
      createdAt
      updatedAt
      picture
    }
  }
`;
