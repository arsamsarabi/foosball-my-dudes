import { gql } from "@apollo/client";

export const FETCH_PLAYER_BY_ID = gql`
  mutation fetchPlayerById($input: FetchPlayerByIdInput!) {
    fetchPlayerById(input: $input) {
      nickname
      tag
      friends {
        nickname
        tag
        createdAt
      }
      createdAt
    }
  }
`;

export const CREATE_PLAYER = gql`
  mutation createPlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      nickname
      tag
      friends {
        nickname
        tag
        createdAt
      }
      createdAt
    }
  }
`;
