import { FC } from "react";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "@auth0/nextjs-auth0";
import { NotificationsProvider } from "@mantine/notifications";
import { ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";

import { client as apolloClient } from "../lib";
import { ContextProvider } from "../context";
import { theme } from "../config";

export const AppProviders: FC = ({ children }) => {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <ContextProvider>
          <CookiesProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
              <NotificationsProvider position="top-right" zIndex={2077}>
                {children}
              </NotificationsProvider>
            </MantineProvider>
          </CookiesProvider>
        </ContextProvider>
      </ApolloProvider>
    </UserProvider>
  );
};
