import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { GraphQLError } from "graphql";

import { FETCH_MY_NOTIFICATIONS } from "../gql";
import { Notification } from "../types";

export const useFetchMyNotifications = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async ({ playerId }: { playerId: string }) => {
    setLoading(true);

    try {
      const {
        data: { fetchMyNotifications },
      } = await client.query({
        query: FETCH_MY_NOTIFICATIONS,
        variables: {
          input: {
            id: playerId,
            includeDone: false,
          },
        },
      });

      setNotifications(fetchMyNotifications);
    } catch (error) {
      setError((error as GraphQLError).message);
    }

    setLoading(false);

    return { loading, notifications, error };
  };

  return { fetchNotifications };
};
