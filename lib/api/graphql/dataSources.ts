import * as Player from "./providers/mongo/Player";
import * as Game from "./providers/mongo/Game";
import type { PlayerProvider, GameProvider } from "./providers/mongo";
import * as auth0 from "./providers/auth0";
import type { Auth0 } from "./providers/auth0";

export type DataSources = PlayerProvider & GameProvider & Auth0;

const dataSources = (): DataSources => ({
  ...Player,
  ...Game,
  ...auth0,
});

export default dataSources;
