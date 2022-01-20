import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";

import { FETCH_MY_NOTIFICATIONS } from "../gql";
import { usePlayerContext } from "../context";
import { Notification } from "../types";

export const useFetchMyNotifications = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [remoteNotifications, setRemoteNotifications] = useState<
    Array<Notification>
  >([]);
  const { player } = usePlayerContext();
  const { user, isLoading, error } = useUser();

  const fetch = async (cb: (notification: Array<Notification>) => void) => {
    if (!user || isLoading || error) {
      throw new Error("User not found");
    }
    setLoading(true);
    const {
      data: { fetchMyNotifications },
      loading,
    } = await client.query({
      query: FETCH_MY_NOTIFICATIONS,
      variables: {
        input: { id: player?.id },
      },
    });
    setLoading(loading);
    setRemoteNotifications(fetchMyNotifications);
    cb(fetchMyNotifications);
  };

  return { remoteNotifications, fetch, loading };
};
