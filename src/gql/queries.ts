import { gql } from "@apollo/client";

import { PLAYER_FIELDS_WITH_FRIENDS } from "./fragments";

export const FETCH_PLAYER_BY_ID = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  query fetchPlayer {
    fetchPlayer {
      ...PlayerFieldsWithFriends
    }
  }
`;

export const SEARCH_PLAYERS_BY_TAG = gql`
  ${PLAYER_FIELDS_WITH_FRIENDS}

  query searchPlayersByTag($input: SearchPlayersByTagInput!) {
    searchPlayersByTag(input: $input) {
      ...PlayerFieldsWithFriends
    }
  }
`;
