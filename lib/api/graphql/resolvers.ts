import type { UserProfile } from "@auth0/nextjs-auth0";
import { CgStack } from "react-icons/cg";

import type { DataSources } from "./dataSources";
import type { Resolvers } from "./generated/resolver";

type Context = {
  accessToken: string;
  user: UserProfile;
  dataSources: DataSources;
  playerId: string;
};

const resolvers: Resolvers<Context> = {
  Query: {
    ping: () => "pong",
    fetchPlayer: async (_parent, args, ctx) => {
      const { user, dataSources } = ctx;
      if (!args.input) {
        throw new Error("Missing input");
      }
      return await dataSources.fetchPlayer({ id: args.input.id });
    },
    fetchPlayerByEmail: async (_parent, _args, ctx) => {
      const { dataSources, user } = ctx;

      if (!user.email) {
        throw new Error("User not found!");
      }

      const fetchResponse = await dataSources.fetchPlayerByEmail({
        email: user.email,
      });

      if (fetchResponse) return fetchResponse;

      const newPlayer = await dataSources.createPlayer({
        nickname: user.nickname || user.name || user.email || undefined,
        picture: user.picture || undefined,
        email: user.email,
      });

      return newPlayer;
    },
    fetchGame: async (_parent, args, ctx) => {
      return await ctx.dataSources.fetchGame({ id: args.input.id });
    },
    searchPlayersByTag: async (_parent, args, ctx) => {
      return await ctx.dataSources.searchPlayersByTag({
        tag: String(args?.input?.tag),
      });
    },
    sendFriendRequest: async (_parent, args, ctx) => {
      return await ctx.dataSources.sendFriendRequest({
        ...args.input,
      });
    },
    fetchNotification: async (_parent, args, ctx) => {
      return await ctx.dataSources.fetchNotification({
        id: args.input.id,
      });
    },
  },
  Mutation: {
    createPlayer: async (_parent, args, ctx) => {
      const { user, playerId, dataSources } = ctx;
      const {
        input: { nickname },
      } = args;

      if (playerId.length) {
        console.table(ctx);
        throw new Error("Player already exists!");
      }

      if (!user.email) {
        throw new Error("User not found!");
      }

      const newPlayer = await dataSources.createPlayer({
        nickname,
        picture: user.picture || undefined,
        email: user.email,
      });

      return await ctx.dataSources.fetchPlayer({ id: String(newPlayer.id) });
    },
    updatePlayer: async (_parent, args, ctx) => {
      return await ctx.dataSources.updatePlayer({
        toUpdate: args.input,
      });
    },
    createGame: async (_parent, args, ctx) => {
      return await ctx.dataSources.createGame({
        newGame: args.input,
      });
    },
    createNotification: async (_parent, args, ctx) => {
      return await ctx.dataSources.createNotification({
        newNotification: args.input,
      });
    },
    markNotificationAsDone: async (_parent, args, ctx) => {
      return await ctx.dataSources.markNotificationAsDone({
        id: args.input.id,
      });
    },
  },
};

export default resolvers;
