import { useFetchPlayer } from "./useFetchPlayer";
import { useFetchMyNotifications } from "./useFetchMyNotifications";
import { usePlayerContext, useNotificationsContext } from "../context";

export const useProfilePageData = () => {
  const { fetchPlayer } = useFetchPlayer();
  const { setPlayer } = usePlayerContext();

  const { fetchNotifications } = useFetchMyNotifications();
  const { addNotifications } = useNotificationsContext();

  const fetch = async () => {
    const { player, loading, error } = await fetchPlayer();

    if (player?.id && !loading && !error) {
      setPlayer(player);
      const {
        loading: loadingNotifications,
        notifications,
        error: errorNotifications,
      } = await fetchNotifications({
        playerId: player.id,
      });

      if (notifications && !loadingNotifications && !errorNotifications) {
        addNotifications(notifications);
      }
    }
  };

  return { fetch };
};
