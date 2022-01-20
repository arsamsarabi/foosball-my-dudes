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

export type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const { width } = useViewportSize();

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

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="lg"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 200 }}
        >
          <Nav />
        </Navbar>
      }
      header={
        <Header height={width < 768 ? 64 : 88} padding={4}>
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            })}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Grid columns={12} grow={!user}>
                {user && (
                  <Grid.Col span={2} offset={1}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </Grid.Col>
                )}
                <Grid.Col span={9}>
                  <Title order={4} ml={12}>
                    Foosball My Dudes
                  </Title>
                </Grid.Col>
              </Grid>
            </MediaQuery>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Group>
                <Grid.Col span={1}>
                  <Logo />
                </Grid.Col>
                <Grid.Col span={8}>
                  <Title order={4} ml={12}>
                    Foosball My Dudes
                  </Title>
                </Grid.Col>
              </Group>
            </MediaQuery>
            <Box
              sx={() => ({
                marginLeft: "auto",
              })}
            >
              <Grid.Col span={2}>
                <NotificationsButton />
                <Notifications />
              </Grid.Col>
            </Box>
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
