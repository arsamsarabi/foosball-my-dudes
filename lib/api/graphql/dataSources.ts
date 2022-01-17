import * as Player from "./providers/mongo/Player";
import * as Game from "./providers/mongo/Game";
import * as Notification from "./providers/mongo/Notification";
import type {
  PlayerProvider,
  GameProvider,
  NotificationProvider,
} from "./providers/mongo";
import * as auth0 from "./providers/auth0";
import type { Auth0 } from "./providers/auth0";

export type DataSources = PlayerProvider &
  GameProvider &
  NotificationProvider &
  Auth0;

const dataSources = (): DataSources => ({
  ...Player,
  ...Game,
  ...Notification,
  ...auth0,
});

export default dataSources;
