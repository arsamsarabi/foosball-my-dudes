import React, { FC, useState } from "react";
import { Grid } from "@mantine/core";
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";

import { Header as AppHeader } from "../Header";
import { Nav } from "../Nav";

export type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

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
        <Header height={72} padding={4}>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Grid.Col span={12}>
              <AppHeader />
            </Grid.Col>
          </MediaQuery>
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
