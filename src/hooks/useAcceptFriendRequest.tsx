import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useNotifications } from "@mantine/notifications";
import { MdOutlineCelebration } from "react-icons/md";
import { VscWarning } from "react-icons/vsc";

import { FriendRequestsPlayerInput, Player } from "../types";
import { ACCEPT_FRIEND_REQUEST } from "../gql";
import { useNotificationsContext } from "../context";

type Props = {
  from: Player;
  to: Player;
  notificationId: string;
};

export const useAcceptFriendRequest = ({ from, to, notificationId }: Props) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const notifications = useNotifications();
  const { removeNotification } = useNotificationsContext();

  console.log(from, to, notificationId);

  const mappedFrom: FriendRequestsPlayerInput = {
    id: String(from.id),
    friends: from.friends.map((f) => f?.id),
    friendRequests: from.friendRequests.map((f) => f?.id),
  };

  const mappedTo: FriendRequestsPlayerInput = {
    id: String(to.id),
    friends: to.friends.map((f) => f?.id),
    friendRequests: to.friendRequests.map((f) => f?.id),
  };

  const accept = async () => {
    setLoading(true);

    const {
      data: { acceptFriendRequest },
    } = await client.mutate({
      mutation: ACCEPT_FRIEND_REQUEST,
      variables: { input: { from: mappedFrom, to: mappedTo } },
    });

    setLoading(false);

    if (acceptFriendRequest === "Ok") {
      removeNotification(notificationId);
      notifications.showNotification({
        title: "Success!",
        message: "Friend request has been accepted!",
        icon: <MdOutlineCelebration />,
        color: "green",
        autoClose: 5000,
      });
    } else {
      notifications.showNotification({
        title: "Ooooops!",
        message: "Accepting friend request failed, try again!",
        icon: <VscWarning />,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return { loading, accept };
};
