import React, { FC } from "react";
import {
  Box,
  Modal,
  Grid,
  useMantineTheme,
  MediaQuery,
  Container,
  Space,
} from "@mantine/core";
import { GiThreeFriends } from "react-icons/gi";
import { BiFootball } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";

import { useNotificationsContext } from "../../context";
import { NotificationType } from "../../types";
import { GameRecorded } from "./GameRecorded";
import { FriendRequest } from "./FriendRequest";

export type NotificationsProps = {};

export const Notifications: FC<NotificationsProps> = (props) => {
  const { notifications, modalOpen, setModalOpen } = useNotificationsContext();
  const theme = useMantineTheme();
  if (notifications.length === 0) return null;

  const renderNotificationIcon = (notificationType: NotificationType) => {
    switch (notificationType) {
      case "FRIEND_REQUEST":
        return (
          <GiThreeFriends
            size={24}
            style={{
              fill: theme.colors.gray[3],
            }}
          />
        );
      case "GAME_RECORDED":
        return (
          <BiFootball
            size={24}
            style={{
              fill: theme.colors.gray[3],
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Notifications"
      radius="sm"
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <IoMdNotificationsOutline size={24} fill={theme.colors.green[7]} />
        {`${notifications.length} new notification${
          notifications.length === 1 ? "" : "s"
        }`}
      </Box>

      <Space h={16} />

      {notifications.map((notification, index) => {
        return (
          <Box
            key={notification.id}
            sx={(theme) => ({
              backgroundColor: theme.colors.primaryDark[0],
              marginBottom:
                index < notifications.length - 1 ? theme.spacing.md : 0,
              borderRadius: theme.radius.sm,
            })}
          >
            <Container>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Grid.Col span={1}>
                  {renderNotificationIcon(notification.notificationType)}
                </Grid.Col>
              </MediaQuery>
              <Grid.Col span={11}>
                {notification.notificationType === "GAME_RECORDED" ? (
                  <GameRecorded notification={notification} />
                ) : null}
                {notification.notificationType === "FRIEND_REQUEST" && (
                  <FriendRequest notification={notification} />
                )}
              </Grid.Col>
            </Container>
          </Box>
        );
      })}
    </Modal>
  );
};

export default Notifications;
