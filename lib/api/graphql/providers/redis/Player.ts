import { Repository } from "redis-om";
import fallguys from "fallguys-names";

import { connect, client, playerSchema } from "./Redis";
import type { Player } from "../../generated/schema";

type FetchPlayer = (args: { id: string }) => Promise<Player | null>;
export const fetchPlayer: FetchPlayer = async ({ id }) => {
  await connect();
  const repository = new Repository(playerSchema, client);
  const player = await repository.fetch(id);
  return player.tag ? player : null;
};

type CreatePlayer = (args: {
  nickname: string;
  createdAt: string;
}) => Promise<string>;
export const createPlayer: CreatePlayer = async ({ nickname, createdAt }) => {
  await connect();

  const repository = new Repository(playerSchema, client);
  const player = repository.createEntity();
  player.nickname = nickname;
  player.createdAt = createdAt;
  player.friends = [];
  player.tag = fallguys() as string;

  const playerId = await repository.save(player);

  return playerId;
};

type SearchPlayers = (args: { q: string }) => Promise<Player[]>;
export const searchPlayers: SearchPlayers = async ({ q }) => {
  await connect();

  const repository = new Repository(playerSchema, client);
  const players = await repository
    .search()
    .where("tag")
    .match(q)
    .or("nickname")
    .match(q)
    .return.all();

  return players;
};

export type Players = {
  fetchPlayer: FetchPlayer;
  createPlayer: CreatePlayer;
  searchPlayers: SearchPlayers;
};
