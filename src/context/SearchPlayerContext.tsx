import { useApolloClient } from "@apollo/client";
import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  FC,
} from "react";

import { SEARCH_PLAYERS_BY_TAG } from "../gql";
import type { Player } from "../types";

interface SearchPlayerState {
  found: Player | null;
  loading: boolean;
}

type SearchPlayerContext = SearchPlayerState & {
  searchPlayerByTag: (tag: string) => Promise<void>;
  reset: () => void;
};

const initialState: SearchPlayerState = {
  found: null,
  loading: false,
};

const SearchPlayerContext = createContext<SearchPlayerContext>({
  ...initialState,
  searchPlayerByTag: () => Promise.resolve(),
  reset: () => {},
});

interface SearchPlayerProviderProps {
  children: ReactElement;
}

const SearchPlayerProvider: FC<SearchPlayerProviderProps> = ({ children }) => {
  const [state, setState] = useState<SearchPlayerState>(initialState);
  const client = useApolloClient();

  const value: SearchPlayerContext = {
    ...state,
    searchPlayerByTag: async (tag) => {
      setState({ ...state, loading: true });

      const { data } = await client.query({
        query: SEARCH_PLAYERS_BY_TAG,
        variables: { input: { tag } },
      });

      setState({ ...state, found: data.searchPlayersByTag, loading: false });
    },
    reset: () => setState(initialState),
  };

  return (
    <SearchPlayerContext.Provider value={value}>
      {children}
    </SearchPlayerContext.Provider>
  );
};

export default SearchPlayerProvider;
export const useSearchPlayerContext = (): SearchPlayerContext =>
  useContext(SearchPlayerContext);
