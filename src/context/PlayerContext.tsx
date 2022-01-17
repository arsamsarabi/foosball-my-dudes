import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
} from "react";

import type { Player } from "../types";

interface PlayerState {
  player: Player | null;
}

type PlayerContext = PlayerState & {
  setPlayer: (player: Player) => void;
};

const initialState: PlayerState = {
  player: null,
};

const PlayerContext = createContext<PlayerContext>({
  ...initialState,
  setPlayer: () => {},
});

interface PlayerProviderProps {
  children: ReactElement;
}

const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [state, setState] = useState<PlayerState>(initialState);

  const value: PlayerContext = {
    ...state,
    setPlayer: (player) => setState({ ...state, player }),
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
export const usePlayerContext = (): PlayerContext => useContext(PlayerContext);
