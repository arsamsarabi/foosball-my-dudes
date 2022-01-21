import { gql } from "@apollo/client";

import {
  PLAYER_FIELDS_WITH_FRIENDS,
  GAME_FIELDS_WITH_PLAYERS,
} from "./fragments";

export const FETCH_PLAYER_BY_ID = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  query fetchPlayer {
    fetchPlayer {
      ...PlayerFieldsWithFriends
    }
  }
`;

export const FETCH_PLAYER_BY_EMAIL = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  query fetchPlayerByEmail {
    fetchPlayerByEmail {
      ...PlayerFieldsWithFriends
    }
  }
`;

export const SEARCH_PLAYERS_BY_TAG = gql`
  query searchPlayersByTag($input: SearchPlayersByTagInput!) {
    searchPlayersByTag(input: $input) {
      id
      nickname
      picture
      friendRequests {
        id
      }
      friends {
        id
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  query sendFriendRequest($input: SendFriendRequestInput!) {
    sendFriendRequest(input: $input)
  }
`;

export const FETCH_MY_NOTIFICATIONS = gql`
  query fetchMyNotifications($input: FetchMyNotificationsInput!) {
    fetchMyNotifications(input: $input) {
      id
      from {
        id
        nickname
        tag
      }
      to {
        id
      }
      context
      resourceId
      notificationType
      done
    }
  }
`;

export const FETCH_GAME_BY_ID = gql`
  ${GAME_FIELDS_WITH_PLAYERS}

  query fetchGame($input: FetchGameInput!) {
    fetchGame(input: $input) {
      ...GameFieldsWithPlayers
    }
  }
`;

export const FETCH_MY_GAMES = gql`
  ${GAME_FIELDS_WITH_PLAYERS}

  query fetchMyGames($input: FetchMyGamesInput!) {
    fetchMyGames(input: $input) {
      ...GameFieldsWithPlayers
    }
  }
`;

export const FETCH_LEADERBOARD = gql`
  query fetchLeaderboard($input: FetchLeaderboardInput!) {
    fetchLeaderboard(input: $input) {
      playerId
      gamesPlayed
      gamesWon
      gamesLost
      gamesTied
      goalsScored
      goalsConceded
      playerScore
    }
  }
`;
