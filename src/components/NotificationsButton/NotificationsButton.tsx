import { FC } from "react";
import { UnstyledButton } from "@mantine/core";
import { IoMdNotificationsOutline } from "react-icons/io";

import { useNotificationsContext } from "../../context";

export const NotificationsButton: FC = () => {
  const { notifications, setModalOpen } = useNotificationsContext();

  if (!notifications.length) return null;

  return (
    <UnstyledButton
      sx={(theme) => ({
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.green[9],
        color: theme.colors.green[3],
        display: "flex",
        borderRadius: theme.radius.sm,
        transition: "0.3s ease-in-out all",
        marginLeft: "auto",

        "&:hover": {
          backgroundColor: theme.colors.dark[8],
        },
      })}
      onClick={() => setModalOpen(true)}
    >
      <IoMdNotificationsOutline />
    </UnstyledButton>
  );
};
