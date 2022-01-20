import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { FETCH_MY_GAMES } from "../gql";
import { usePlayerContext } from "../context";

export const useFetchMyGame = () => {
  const client = useApolloClient();
  const { player, setGames } = usePlayerContext();
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    setLoading(true);
    const {
      data: { fetchMyGames },
      loading,
    } = await client.query({
      query: FETCH_MY_GAMES,
      variables: {
        input: {
          playerId: player?.id,
          limit: 50,
          skip: 0,
        },
      },
    });

    setLoading(loading);
    setGames(fetchMyGames);
  };

  return { loading, fetch };
};
