import React, { FC } from "react";

export type FriendRequestProps = {
  notification: Notification;
};

export const FriendRequest: FC<FriendRequestProps> = (notification) => {
  return (
    <>
      <h1>FriendRequest</h1>
    </>
  );
};

export default FriendRequest;
