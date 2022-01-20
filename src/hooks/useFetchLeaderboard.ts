import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { FETCH_LEADERBOARD } from "../gql";
import { usePlayerContext } from "../context";

export const useFetchLeaderboard = () => {
  const client = useApolloClient();
  const { player } = usePlayerContext();
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    setLoading(true);
    const {
      data: { fetchLeaderboard },
      loading,
    } = await client.query({
      query: FETCH_LEADERBOARD,
      variables: {
        input: {
          players: [
            player?.id,
            ...(player?.friends?.map((friend) => friend?.id) || []),
          ],
        },
      },
    });

    setLoading(loading);

    return fetchLeaderboard;
  };

  return { loading, fetch };
};
