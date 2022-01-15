import * as redis from "./providers/redis";
import type { Players } from "./providers/redis";
import * as auth0 from "./providers/auth0";
import type { Auth0 } from "./providers/auth0";

export type DataSources = Players & Auth0;

const dataSources = (): DataSources => ({
  ...redis,
  ...auth0,
});

export default dataSources;
