import { FC } from "react";
import { Space, Box } from "@mantine/core";
import { RiLogoutCircleLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { useMediaQuery } from "@mantine/hooks";

import { routes } from "../../config";
import { NavLink, IconLink } from "./NavLink";

export const Nav: FC = () => {
  const isSmall = useMediaQuery("(max-width: 1200px)");

  return isSmall ? <MobileNav /> : <DesktopNav />;
};

const DesktopNav = () => {
  return (
    <NavBox>
      <NavLink
        to={routes.profile}
        color="primary"
        leftIcon={<VscDebugStart />}
        variant="outline"
      >
        New Game
      </NavLink>
      <Space h={8} />
      <NavLink
        to={routes.logout}
        color="red"
        leftIcon={<RiLogoutCircleLine />}
        variant="subtle"
      >
        Logout
      </NavLink>
    </NavBox>
  );
};

const MobileNav = () => {
  return (
    <NavBox>
      <IconLink to={routes.profile} color="primary" variant="outline">
        <VscDebugStart />
      </IconLink>
      <Space h={8} />
      <IconLink to={routes.logout} color="red">
        <RiLogoutCircleLine />
      </IconLink>
    </NavBox>
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
