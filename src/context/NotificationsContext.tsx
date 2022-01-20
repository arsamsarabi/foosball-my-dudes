import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { useFetchMyNotifications } from "../hooks";
import { usePlayerContext } from "./PlayerContext";
import type { Notification, Player } from "../types";

interface NotificationsState {
  notifications: Array<Notification>;
  modalOpen: boolean;
}

type NotificationsContext = NotificationsState & {
  addNotifications: (notification: Array<Notification>) => void;
  removeNotification: (id: string) => void;
  setModalOpen: (val: boolean) => void;
  reset: () => void;
};

const initialState: NotificationsState = {
  notifications: [],
  modalOpen: false,
};

const NotificationsContext = createContext<NotificationsContext>({
  ...initialState,
  setModalOpen: () => {},
  addNotifications: () => {},
  removeNotification: () => {},
  reset: () => {},
});

interface NotificationsProviderProps {
  children: ReactElement;
}

const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  const { fetch, loading, remoteNotifications } = useFetchMyNotifications();
  const [state, setState] = useState<NotificationsState>(initialState);
  const { player } = usePlayerContext();

  useEffect(() => {
    async function fetchRemoteNotifications() {
      await fetch();
    }

    if (player) {
      fetchRemoteNotifications();
    }
  }, [player]);

  useEffect(() => {
    if (player && player.friendRequests.length) {
      const { friendRequests } = player;
      let notifications: Array<Notification> = [];

      if (loading) return;

      friendRequests.forEach((fRequest?: Player) => {
        if (
          fRequest &&
          state.notifications
            .filter((notif) => notif.notificationType === "FRIEND_REQUEST")
            .every((notifi) => notifi.from.id !== fRequest.id)
        ) {
          notifications.push({
            id: uuidv4(),
            context: "Player",
            done: false,
            from: fRequest,
            to: player,
            notificationType: "FRIEND_REQUEST",
          });
        }
      });

      const _notifications = [
        ...state.notifications,
        ...notifications,
        ...remoteNotifications,
      ];

      setState({
        ...state,
        notifications: [...new Set(_notifications)],
      });
    }
  }, [player, loading, remoteNotifications]);

  const addNotifications = (newNotifications: Array<Notification>) => {
    const n = [...state.notifications, ...newNotifications];

    console.log("-----------------addNotification-----------------");
    console.log(state.notifications);
    console.log(n);

    setState({
      ...state,
      notifications: n,
    });
  };

  const value: NotificationsContext = {
    ...state,
    addNotifications,
    removeNotification: (id) => {
      setState({
        ...state,
        notifications: state.notifications.filter((n) => n.id !== id),
      });
    },
    setModalOpen: (val) => setState({ ...state, modalOpen: val }),
    reset: () => {
      setState(initialState);
    },
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
