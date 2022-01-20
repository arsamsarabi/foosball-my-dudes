import { UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type MenuButtonProps = {};

// eslint-disable-next-line react/display-name
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ ...buttonProps }: MenuButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.green[9],
        color: theme.colors.green[3],
        display: "flex",
        borderRadius: theme.radius.sm,
        transition: "0.3s ease-in-out all",

        "&:hover": {
          backgroundColor: theme.colors.dark[8],
        },
      })}
      {...buttonProps}
    >
      <IoMdNotificationsOutline />
    </UnstyledButton>
  )
);
