import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
  useEffect,
} from "react";

import { usePlayerContext } from "./PlayerContext";
import type { Notification, Player } from "../types";

interface NotificationsState {
  notifications: Array<Notification>;
}

type NotificationsContext = NotificationsState & {
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  reset: () => void;
};

const initialState: NotificationsState = {
  notifications: [],
};

const NotificationsContext = createContext<NotificationsContext>({
  ...initialState,
  addNotification: () => {},
  removeNotification: () => {},
  reset: () => {},
});

interface NotificationsProviderProps {
  children: ReactElement;
}

const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<NotificationsState>(initialState);
  const { player } = usePlayerContext();

  useEffect(() => {
    if (player && player.friendRequests.length) {
      const { friendRequests } = player;
      let notifications: Array<Notification> = [];

      friendRequests.forEach((fr?: Player) => {
        if (fr) {
          notifications.push({
            context: "Player",
            done: false,
            from: fr,
            to: player,
            notificationType: "FRIEND_REQUEST",
          });
        }
      });

      setState({
        ...state,
        notifications: [...state.notifications, ...notifications],
      });
    }
  }, [player]);

  const value: NotificationsContext = {
    ...state,
    addNotification: (notification) =>
      setState({
        ...state,
        notifications: [...state.notifications, notification],
      }),
    removeNotification: (id) =>
      setState({
        ...state,
        notifications: state.notifications.filter((n) => n.id !== id),
      }),
    reset: () => setState(initialState),
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
export const useNotificationsContext = (): NotificationsContext =>
  useContext(NotificationsContext);
