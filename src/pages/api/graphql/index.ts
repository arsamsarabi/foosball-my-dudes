import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { IncomingMessage, ServerResponse } from "http";

import {
  getSession,
  permissions,
  resolvers,
  dataSources,
  typeDefs,
  connect,
} from "../../../../lib";

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    permissions
  ),
  dataSources: (): any => dataSources(),
  context: ({ req, res }) => {
    const sess = getSession(req, res);

    return {
      accessToken: sess?.accessToken,
      user: sess?.user,
      playerId: sess?.user["https://arsam.dev/player_id"],
      lastSeen: sess?.user["https://arsam.dev/last_seen"],
    };
  },
});

const startServer = server.start();
const startDB = connect();

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    await startDB;
    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
    console.debug("Response handled for", req.headers.referer);
  } catch (e) {
    console.error("Response not handled for", req.headers.referer, e);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
