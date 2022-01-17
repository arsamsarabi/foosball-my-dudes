import { fallguys } from "fallguys-names";

import {
  Player as PlayerType,
  UpdatePlayerInput,
} from "../../../generated/schema";
import { Player } from "./model";

type FetchPlayer = (args: { id: string }) => Promise<PlayerType>;
export const fetchPlayer: FetchPlayer = async ({ id }) => {
  return await Player.findById(id);
};

type CreatePlayer = (args: {
  nickname?: string;
  picture?: string;
}) => Promise<PlayerType>;
export const createPlayer: CreatePlayer = async ({ nickname, picture }) => {
  const player = new Player();
  player.nickname = nickname;
  player.picture = picture;
  player.tag = fallguys();
  return await player.save();
};

type UpdatePlayer = (args: {
  toUpdate: UpdatePlayerInput;
}) => Promise<PlayerType>;
export const updatePlayer: UpdatePlayer = async ({ toUpdate }) => {
  const updated = await Player.findOneAndUpdate(
    { _id: toUpdate.id },
    toUpdate,
    {
      new: true,
    }
  );
  return updated;
};

type SearchPlayersByTag = (args: { tag: string }) => Promise<PlayerType>;
export const searchPlayersByTag: SearchPlayersByTag = async ({ tag }) => {
  return await Player.findOne({ tag });
};

export type PlayerProvider = {
  fetchPlayer: FetchPlayer;
  createPlayer: CreatePlayer;
  updatePlayer: UpdatePlayer;
  searchPlayersByTag: SearchPlayersByTag;
};
