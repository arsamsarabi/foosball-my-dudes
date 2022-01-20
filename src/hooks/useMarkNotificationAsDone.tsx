import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import { MARK_NOTIFICATION_AS_DONE } from "../gql";
import { useNotificationsContext } from "../context";

export const useMarkNotificationAsDone = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { removeNotification } = useNotificationsContext();

  const markAsDone = async (id: string) => {
    setLoading(true);

    const {
      data: { markNotificationAsDone },
    } = await client.mutate({
      mutation: MARK_NOTIFICATION_AS_DONE,
      variables: { input: { id } },
    });

    setLoading(false);
    removeNotification(markNotificationAsDone.id);
  };

  return { loading, markAsDone };
};
