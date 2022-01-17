import { FC, useState } from "react";
import { Space, Box } from "@mantine/core";
import { RiLogoutCircleLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { Button } from "@mantine/core";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdHistoryToggleOff, MdOutlineLeaderboard } from "react-icons/md";

import { routes } from "../../config";
import { NavLink } from "./NavLink";
import { AddFriendModal } from "../AddFriendModal";

export const Nav: FC = () => {
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  return (
    <>
      <NavBox>
        <NavLink to={routes.profile} leftIcon={<CgProfile />} variant="filled">
          Profile
        </NavLink>
        <Space h={16} />
        <NavLink
          to={routes.history}
          leftIcon={<MdHistoryToggleOff />}
          variant="filled"
        >
          History
        </NavLink>
        <Space h={16} />
        <NavLink
          to={routes.leaderboard}
          leftIcon={<MdOutlineLeaderboard />}
          variant="filled"
        >
          Leaderboard
        </NavLink>
        <Space h={16} />
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
        <Space h={16} />
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

        "& > *:nth-child(6)": {
          marginTop: "auto",
        },
      })}
    >
      {children}
    </Box>
  );
};
