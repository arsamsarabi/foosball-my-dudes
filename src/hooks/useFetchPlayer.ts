import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";

import { FETCH_PLAYER_BY_SUB } from "../gql";
import { usePlayerContext } from "../context";

export const useFetchPlayer = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(true);
  const { player, setPlayer } = usePlayerContext();
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    async function fetchPlayer() {
      const {
        data: { fetchPlayerByEmail },
        loading,
      } = await client.query({
        query: FETCH_PLAYER_BY_SUB,
      });

      setPlayer(fetchPlayerByEmail);
      setLoading(loading);
    }

    if (user && !isLoading && !error) {
      fetchPlayer();
      setLoading(false);
    }
  }, [user, isLoading, error]);

  return { loading, player };
};
