import React, { FC, useEffect, useState } from "react";
import { Box, Grid, Group } from "@mantine/core";
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";
import { useUser } from "@auth0/nextjs-auth0";

import { NotificationsButton } from "../NotificationsButton";
import { Notifications } from "../Notifications";
import { Nav } from "../Nav";
import { Logo } from "../Logo";
import { Title } from "../Text";
import { useNotificationsContext, usePlayerContext } from "../../context";

export type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const { width } = useViewportSize();
  const { player } = usePlayerContext();

  useEffect(() => {
    const handleRouteChange = () => {
      setOpened(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const headerHeight = width < 768 ? 64 : 88;

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        user && player ? (
          <Navbar
            padding="lg"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 200 }}
          >
            <Nav />
          </Navbar>
        ) : (
          <></>
        )
      }
      header={
        <Header height={headerHeight}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              height: headerHeight,
              padding: `0 ${theme.spacing.sm}px`,
            })}
          >
            {user && (
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            )}

            <Logo />

            <Title order={4} ml={12}>
              Foosball My Dudes
            </Title>

            <NotificationsButton />
            <Notifications />
          </Box>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
