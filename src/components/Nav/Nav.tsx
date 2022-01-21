import { FC, useState } from "react";
import { Space, Box, Avatar, UnstyledButton } from "@mantine/core";
import { RiLogoutCircleLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { Button } from "@mantine/core";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdHistoryToggleOff, MdOutlineLeaderboard } from "react-icons/md";
import { useCookies } from "react-cookie";

import { routes } from "../../config";
import { NavLink } from "./NavLink";
import { AddFriend } from "../AddFriend";
import { usePlayerContext } from "../../context";
import { NewGame } from "../NewGame";

export const Nav: FC = () => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [openNewGame, setOpenNewGame] = useState(false);
  const { player } = usePlayerContext();
  const [cookies, setCookie, removeCookie] = useCookies(["appSession"]);
  const { picture, nickname } = player || {};

  const clearAllCookies = () => {
    setCookie("appSession", "", { path: "/" });
    removeCookie("appSession");
  };

  return (
    <>
      <NavBox>
        <Avatar src={picture} alt={nickname} size={124} />
        <Space h={16} />
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
          onClick={() => setOpenNewGame(true)}
          color="primary"
          leftIcon={<VscDebugStart />}
          variant="outline"
          fullWidth
        >
          New Game
        </Button>
        <Space h={16} />
        <Button
          onClick={() => setOpenAddFriend(true)}
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
          onButtonClick={clearAllCookies}
        >
          Logout
        </NavLink>
      </NavBox>
      <AddFriend
        open={openAddFriend}
        toggle={() => setOpenAddFriend(!openAddFriend)}
      />
      <NewGame open={openNewGame} toggle={() => setOpenNewGame(!openNewGame)} />
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

        "& > *:nth-child(8)": {
          marginTop: "auto",
        },
      })}
    >
      {children}
    </Box>
  );
};
