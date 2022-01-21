import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GraphQLError } from "graphql";

import { FETCH_PLAYER_BY_EMAIL } from "../gql";
import { Player } from "../types";

export const useFetchPlayer = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayer = async () => {
    setLoading(true);

    try {
      const {
        data: { fetchPlayerByEmail },
      } = await client.query({
        query: FETCH_PLAYER_BY_EMAIL,
      });

      setPlayer(fetchPlayerByEmail);
    } catch (error) {
      setError((error as GraphQLError).message);
    }

    setLoading(false);

    return { loading, player, error };
  };

  return { fetchPlayer };
};
