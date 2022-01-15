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
    };
  },
});

export const config = {
  api: {
    bodyParser: false, // parse as stream
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  console.info("Incomming request for", req.headers.referer);
  try {
    await server.start();
    await server.createHandler({ path: "/api/graphql" })(req, res);
    console.debug("Response handled for", req.headers.referer);
  } catch (e) {
    console.error("Response not handled for", req.headers.referer, e);
  }
};
