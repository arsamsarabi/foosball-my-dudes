import { FC, useState } from "react";
import { Space, Box } from "@mantine/core";
import { RiLogoutCircleLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { Button, ActionIcon } from "@mantine/core";
import { FaUserFriends } from "react-icons/fa";

import { routes } from "../../config";
import { NavLink, IconLink } from "./NavLink";
import { AddFriendModal } from "../AddFriendModal";

export const Nav: FC = () => {
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  return (
    <>
      <NavBox>
        <Button
          onClick={() => {}}
          color="primary"
          leftIcon={<VscDebugStart />}
          variant="outline"
          fullWidth
        >
          New Game
        </Button>
        <Space h={16} />
        <Button
          onClick={() => setOpenAddFriendModal(true)}
          color="primary"
          leftIcon={<FaUserFriends />}
          variant="outline"
          fullWidth
        >
          Add a friend
        </Button>
        <NavLink
          to={routes.logout}
          color="red"
          leftIcon={<RiLogoutCircleLine />}
          variant="subtle"
        >
          Logout
        </NavLink>
      </NavBox>
      <AddFriendModal
        open={openAddFriendModal}
        toggle={() => setOpenAddFriendModal(!open)}
      />
    </>
  );
};

export const NavBox: FC = ({ children }) => {
  return (
    <Box
      sx={() => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",

        "& > *:last-child": {
          marginTop: "auto",
        },
      })}
    >
      {children}
    </Box>
  );
};
