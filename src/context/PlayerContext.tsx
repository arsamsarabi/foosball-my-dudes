import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
} from "react";

import type { Game, Player } from "../types";

interface PlayerState {
  player: Player | null;
  games: Array<Game>;
}

type PlayerContext = PlayerState & {
  setPlayer: (player: Player) => void;
  setGames: (games: Array<Game>) => void;
  reset: () => void;
};

const initialState: PlayerState = {
  player: null,
  games: [],
};

const PlayerContext = createContext<PlayerContext>({
  ...initialState,
  setPlayer: () => {},
  setGames: () => {},
  reset: () => {},
});

interface PlayerProviderProps {
  children: ReactElement;
}

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [state, setState] = useState<PlayerState>(initialState);

  const value: PlayerContext = {
    ...state,
    setPlayer: (player) => setState({ ...state, player }),
    setGames: (games) => setState({ ...state, games }),
    reset: () => setState(initialState),
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
export const usePlayerContext = (): PlayerContext => useContext(PlayerContext);
