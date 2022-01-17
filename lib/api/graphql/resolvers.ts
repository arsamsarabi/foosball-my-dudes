import type { DataSources } from "./dataSources";
import type { Resolvers } from "./generated/resolver";

type Context = {
  accessToken: string;
  user: { org_id: string; sub: string; picture: string };
  dataSources: DataSources;
  playerId: string;
};

const resolvers: Resolvers<Context> = {
  Query: {
    ping: () => "pong",
    fetchPlayer: async (_parent, _args, ctx) => {
      const metadata = await ctx.dataSources.getUserAppMetadata({
        userId: ctx.user.sub,
      });
      if (metadata.playerId) {
        const response = ctx.dataSources.fetchPlayer({
          id: String(metadata.playerId),
        });
        return response;
      } else {
        const newPlayer = await ctx.dataSources.createPlayer({});
        await ctx.dataSources.updateUserAppMetadata({
          userId: ctx.user.sub,
          metadata: {
            playerId: newPlayer.id,
          },
        });
        return await ctx.dataSources.fetchPlayer({ id: String(newPlayer.id) });
      }
    },
    fetchGame: async (_parent, args, ctx) => {
      return await ctx.dataSources.fetchGame({ id: args.input.id });
    },
    searchPlayersByTag: async (_parent, args, ctx) => {
      console.log(args?.input?.tag);

      const player = await ctx.dataSources.searchPlayersByTag({
        tag: String(args?.input?.tag),
      });

      console.log(player);

      return player;
    },
  },
  Mutation: {
    createPlayer: async (_parent, args, ctx) => {
      console.log("createPlayer");
      console.log(ctx);
      const newPlayer = await ctx.dataSources.createPlayer({
        nickname: args.input.nickname,
        picture: ctx.user.picture,
      });
      await ctx.dataSources.updateUserAppMetadata({
        userId: ctx.user.sub,
        metadata: {
          playerId: newPlayer.id,
        },
      });
      return await ctx.dataSources.fetchPlayer({ id: String(newPlayer.id) });
    },
    updatePlayer: async (_parent, args, ctx) => {
      const { id, ...rest } = args.input;

      const { playerId } = await ctx.dataSources.getUserAppMetadata({
        userId: ctx.user.sub,
      });

      const updated = await ctx.dataSources.updatePlayer({
        toUpdate: {
          id: String(playerId),
          ...rest,
        },
      });

      return updated;
    },
    createGame: async (_parent, args, ctx) => {
      return await ctx.dataSources.createGame({
        newGame: args.input,
      });
    },
  },
};

export default resolvers;
