import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "@auth0/nextjs-auth0";
import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ApolloProvider, InMemoryCache } from "@apollo/client";

import { Header as AppHeader, Nav } from "../components";
import { client as apolloClient } from "../lib";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>Foosball My Dudes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "dark",
              fontFamily: "'Raleway', sans-serif",
              headings: { fontFamily: "'Ubuntu', sans" },
              colors: {
                primaryLight: ["#31bccc"],
                primaryDark: ["#405983"],
                accent: ["#ffdd83"],
                textLight: ["#e3f8ff"],
                textDark: ["#1a1b1e"],
              },
            }}
          >
            <NotificationsProvider position="top-right" zIndex={2077}>
              <AppShell
                navbarOffsetBreakpoint="sm"
                fixed
                navbar={
                  <Navbar
                    padding="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 60, lg: 200 }}
                  >
                    <Nav />
                  </Navbar>
                }
                header={
                  <Header height={70} padding="md">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="sm"
                          color={theme.colors.gray[6]}
                          mr="xl"
                        />
                      </MediaQuery>

                      <AppHeader />
                    </div>
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
                <Component {...pageProps} />
              </AppShell>
            </NotificationsProvider>
          </MantineProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}
