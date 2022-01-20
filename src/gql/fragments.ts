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
      friendRequests {
        id
      }
      friends {
        id
      }
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

export const GAME_FIELDS_WITH_PLAYERS = gql`
  fragment GameFieldsWithPlayers on Game {
    __typename
    id
    teamOne {
      id
      nickname
      picture
    }
    teamTwo {
      id
      nickname
      picture
    }
    teamOneScore
    teamTwoScore
    creator {
      id
      nickname
      picture
    }
    createdAt
    updatedAt
  }
`;
