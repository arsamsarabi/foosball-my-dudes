import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { FETCH_GAME_BY_ID } from "../gql";

export const useFetchGame = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async (id: string) => {
    setLoading(true);
    const {
      data: { fetchGame },
      loading,
    } = await client.query({
      query: FETCH_GAME_BY_ID,
      variables: {
        input: {
          id,
        },
      },
    });

    setLoading(loading);
    return fetchGame;
  };

  return { loading, fetch };
};
