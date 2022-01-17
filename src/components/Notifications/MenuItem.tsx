import React, { FC } from "react";
import { Notification } from "../../types";

import { FriendRequest } from "./FriendRequest";

export type MenuItemProps = {
  notification: Notification;
};

export const MenuItem: FC<MenuItemProps> = ({ notification }) => {
  switch (notification.type) {
    case "FRIEND_REQUEST":
      return <FriendRequest notification={notification} />;
    default:
      return <div>{notification.type}</div>;
  }
};

export default MenuItem;
