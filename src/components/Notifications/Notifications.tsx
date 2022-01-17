import { Badge, Box, Menu } from "@mantine/core";
import React, { FC } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

import { useNotificationsContext } from "../../context";
import { MenuButton } from "./MenuButton";
import MenuItem from "./MenuItem";

export type NotificationsProps = {};

export const Notifications: FC<NotificationsProps> = (props) => {
  const { notifications } = useNotificationsContext();
  return (
    <Box
      sx={() => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      })}
    >
      <Menu
        trigger="hover"
        size="sm"
        menuButtonLabel="Notifications"
        radius="sm"
        withArrow
        control={<MenuButton numberOfNotifications={notifications.length} />}
      >
        <Menu.Label
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
        >
          <IoMdNotificationsOutline />
          {`${notifications.length} new Notification${
            notifications.length === 1 ? "" : "s"
          }`}
        </Menu.Label>
        {notifications.map((notification) => (
          <Menu.Item key={notification.id}>
            <MenuItem notification={notification} />
          </Menu.Item>
        ))}
      </Menu>
    </Box>
  );
};

export default Notifications;
