import React, { FC } from "react";
import { Box, Button, LoadingOverlay, Space } from "@mantine/core";
import { FaRegHandshake, FaRegFrownOpen } from "react-icons/fa";

import { Notification } from "../../types";
import { Text } from "../Text";
import { useAcceptFriendRequest, useRejectFriendRequest } from "../../hooks";

export type FriendRequestProps = {
  notification: Notification;
};

export const FriendRequest: FC<FriendRequestProps> = ({ notification }) => {
  const { from, to } = notification;

  const { loading: acceptLoading, accept } = useAcceptFriendRequest({
    from,
    to,
    notificationId: String(notification.id),
  });

  const { loading: rejectLoading, reject } = useRejectFriendRequest({
    from,
    to,
    notificationId: String(notification.id),
  });

  return (
    <Box
      sx={(theme) => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
      })}
    >
      <LoadingOverlay visible={acceptLoading || rejectLoading} />
      <Text size="sm">{`${notification.from.nickname} sent you a friend request!`}</Text>
      <Space h={16} />
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        })}
      >
        <Button color="green" leftIcon={<FaRegHandshake />} onClick={accept}>
          Accept
        </Button>
        <Button
          color="red"
          variant="light"
          leftIcon={<FaRegFrownOpen />}
          onClick={reject}
        >
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default FriendRequest;
