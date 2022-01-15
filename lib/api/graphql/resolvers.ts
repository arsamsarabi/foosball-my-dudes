import type { DataSources } from "./dataSources";
import type { Resolvers } from "./generated/resolver";

type Context = {
  accessToken: string;
  user: { org_id: string; sub: string };
  dataSources: DataSources;
};

const resolvers: Resolvers<Context> = {
  Query: {
    ping: () => "pong",
  },
  Mutation: {
    fetchPlayerById: async (_parent, args, ctx) => {
      return await ctx.dataSources.fetchPlayer({ id: args.input.id });
    },
    createPlayer: async (_parent, args, ctx) => {
      const playerId = await ctx.dataSources.createPlayer({
        nickname: args.input.nickname,
        createdAt: new Date().toISOString(),
      });
      await ctx.dataSources.updateUserAppMetadata({
        userId: ctx.user.sub,
        metadata: {
          playerId,
        },
      });
      return await ctx.dataSources.fetchPlayer({ id: playerId });
    },
  },
};

export default resolvers;
