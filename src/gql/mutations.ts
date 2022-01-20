import { gql } from "@apollo/client";

import { PLAYER_FIELDS_WITH_FRIENDS } from "./fragments";

export const CREATE_PLAYER = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  mutation createPlayer($input: CreatePlayerInput!) {
    createPlayer(input: $input) {
      ...PlayerFieldsWithFriends
    }
  }
`;

export const UPDATE_PLAYER = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  mutation updatePlayer($input: UpdatePlayerInput!) {
    updatePlayer(input: $input) {
      ...PlayerFieldsWithFriends
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($input: AcceptFriendRequestInput!) {
    acceptFriendRequest(input: $input)
  }
`;

export const REJECT_FRIEND_REQUEST = gql`
  mutation rejectFriendRequest($input: RejectFriendRequestInput!) {
    rejectFriendRequest(input: $input)
  }
`;

export const CREATE_GAME = gql`
  mutation createGame($input: CreateGameInput!) {
    createGame(input: $input) {
      id
    }
  }
`;

export const MARK_NOTIFICATION_AS_DONE = gql`
  mutation markNotificationAsDone($input: MarkNotificationAsDoneInput!) {
    markNotificationAsDone(input: $input) {
      id
    }
  }
`;
