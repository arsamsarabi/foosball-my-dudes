import React, { ReactElement, FC } from "react";

import PlayerProvider from "./PlayerContext";
import SearchPlayerProvider from "./SearchPlayerContext";
import NotificationsProvider from "./NotificationsContext";

interface ContextProviderInterface {
  children: ReactElement;
}

export const ContextProvider: FC<ContextProviderInterface> = ({ children }) => {
  return (
    <PlayerProvider>
      <SearchPlayerProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </SearchPlayerProvider>
    </PlayerProvider>
  );
};
