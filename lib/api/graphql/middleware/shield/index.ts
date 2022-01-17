import { rule, shield, deny, allow } from "graphql-shield";
import { ApolloError } from "apollo-server-micro";

const isAuthenticated = rule({ cache: "contextual" })(
  async (_parent, _args, ctx) => {
    return !!ctx.user;
  }
);

export const permissions = shield(
  {
    Query: {
      "*": deny,
      ping: allow,
      fetchPlayer: isAuthenticated,
      fetchPlayerByEmail: isAuthenticated,
      fetchGame: isAuthenticated,
      searchPlayersByTag: isAuthenticated,
      sendFriendRequest: isAuthenticated,
      fetchNotification: isAuthenticated,
    },
    Mutation: {
      "*": deny,
      createPlayer: isAuthenticated,
      updatePlayer: isAuthenticated,
      createGame: isAuthenticated,
      createNotification: isAuthenticated,
      markNotificationAsDone: isAuthenticated,
    },
  },
  {
    fallbackError: async (error): Promise<Error> => {
      if (error instanceof ApolloError) {
        console.warn("Unexpected GraphQL error", error);
        return error;
      }

      if (error instanceof Error) {
        console.warn("Unexpected error", error);
        return error;
      }

      return new Error("Not Authorised!");
    },
  }
);
