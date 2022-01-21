import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";

import { FETCH_PLAYER_BY_SUB } from "../gql";
import { useNotificationsContext, usePlayerContext } from "../context";
import { Player } from "../types";

export const useFetchPlayer = () => {
  const client = useApolloClient();
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const { player, setPlayer } = usePlayerContext();
  const { fetch: fetchNotifications, addFriendRequests } =
    useNotificationsContext();

  useEffect(() => {
    async function fetchPlayer() {
      setLoading(true);
      const {
        data: { fetchPlayerByEmail },
        loading,
      } = await client.query({
        query: FETCH_PLAYER_BY_SUB,
      });

      setPlayer(fetchPlayerByEmail);
      addFriendRequests(fetchPlayerByEmail.friendRequests);
      await fetchNotifications();
      setLoading(loading);
    }

    if (user && !isLoading && !error) {
      fetchPlayer();
    }
  }, [user, isLoading, error]);

  if (isLoading) return { loading: isLoading, error: "fetching user ..." };

  if (error)
    return { loading: false, error: error.message || "Error fetching user." };

  if (!user) return { loading: false, error: "User not found." };

  return { loading, player };
};
