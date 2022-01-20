import type { UserProfile } from "@auth0/nextjs-auth0";

import type { DataSources } from "./dataSources";
import type { CreateNotificationInput, Resolvers } from "./generated/resolver";
import { Game, PlayerStat } from "./generated/schema";
import { createPlayerStat } from "./utils";

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
    fetchMyNotifications: async (_parent, args, ctx) => {
      return await ctx.dataSources.fetchMyNotifications({
        id: args.input.id,
      });
    },
    fetchMyGames: async (_parent, { input }, ctx) => {
      return await ctx.dataSources.fetchMyGames({
        playerId: String(input?.playerId),
        limit: Number(input?.limit),
        skip: Number(input?.skip),
      });
    },
    fetchLeaderboard: async (_parent, { input }, ctx) => {
      const leaderboard: Array<PlayerStat> = [];

      const playersAndGames = await Promise.all(
        input.players.map(async (playerId: string) => {
          const player = await ctx.dataSources.fetchPlayer({ id: playerId });
          let games: Array<Game> = [];
          if (player && player.id) {
            games = await ctx.dataSources.fetchMyGames({
              playerId: player.id,
              limit: 50,
              skip: 0,
            });
          }
          return { player, games };
        })
      );

      playersAndGames.forEach((item) => {
        if (item.player) {
          leaderboard.push(createPlayerStat(item));
        }
      });

      return leaderboard;
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
      const newGame = await ctx.dataSources.createGame({
        newGame: args.input,
      });

      if (newGame.id) {
        [...args.input.teamOne, ...args.input.teamTwo].forEach(
          async (playerId) => {
            if (playerId === args.input.creator) return;

            const notification: CreateNotificationInput = {
              context: "Game",
              from: args.input.creator,
              notificationType: "GAME_RECORDED",
              resourceId: newGame.id,
              to: playerId,
            };

            await ctx.dataSources.createNotification({
              newNotification: notification,
            });
          }
        );
      }

      return newGame;
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
    acceptFriendRequest: async (_parent, args, ctx) => {
      return await ctx.dataSources.acceptFriendRequest({
        ...args.input,
      });
    },
    rejectFriendRequest: async (_parent, args, ctx) => {
      return await ctx.dataSources.rejectFriendRequest({
        ...args.input,
      });
    },
  },
};

export default resolvers;
