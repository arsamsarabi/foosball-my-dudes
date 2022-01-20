import React, { FC } from "react";
import { Box, Button, Group, LoadingOverlay, Space } from "@mantine/core";
import Link from "next/link";
import { BsCheck2All } from "react-icons/bs";
import { MdOutlineArrowForward } from "react-icons/md";

import { Notification } from "../../types";
import { Text } from "../Text";
import { useMarkNotificationAsDone } from "../../hooks";
import { routes } from "../../config";
import { useNotificationsContext } from "../../context";

export type GameRecordedProps = {
  notification: Notification;
};

export const GameRecorded: FC<GameRecordedProps> = ({ notification }) => {
  const { markAsDone, loading } = useMarkNotificationAsDone();
  const { setModalOpen } = useNotificationsContext();

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
      <LoadingOverlay visible={loading} />
      <Text
        size="sm"
        weight={400}
      >{`${notification.from.nickname} recorded a game that you played together!`}</Text>
      <Space h={16} />
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        })}
      >
        <Button
          color="gray"
          variant="light"
          leftIcon={<BsCheck2All />}
          onClick={() => markAsDone(String(notification?.id))}
          size="sm"
        >
          Done
        </Button>
        <Link href={`${routes.game}/${notification.resourceId}`} passHref>
          <Button
            size="sm"
            color="green"
            variant="filled"
            leftIcon={<MdOutlineArrowForward />}
            onClick={() => setModalOpen(false)}
          >
            View
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default GameRecorded;
