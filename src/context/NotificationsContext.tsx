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
  addFriendRequests: (friendRequests: Array<Player>) => void;
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
  addFriendRequests: () => {},
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
      setState({
        ...state,
        notifications: [...state.notifications, ...remoteNotifications],
      });
    }

    if (player) {
      fetchRemoteNotifications();
    }
  }, [player]);

  const value: NotificationsContext = {
    ...state,
    addNotifications: (newNotifications: Array<Notification>) => {
      setState({
        ...state,
        notifications: [...state.notifications, ...newNotifications],
      });
    },
    addFriendRequests: (friendRequests: Array<Player>) => {
      let _fr: Array<Notification> = [];

      friendRequests.forEach((fRequest?: Player) => {
        const newNotification: Notification = {
          id: uuidv4(),
          context: "Player",
          done: false,
          from: fRequest as Player,
          to: player as Player,
          notificationType: "FRIEND_REQUEST",
        };

        _fr.push(newNotification);
      });

      setState({
        ...state,
        notifications: [...state.notifications, ..._fr],
      });
    },
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
