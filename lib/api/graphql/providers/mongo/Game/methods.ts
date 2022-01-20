import { CreateGameInput, Game as GameType } from "../../../generated/schema";
import { Game } from "./model";

type FetchGame = (args: { id: string }) => Promise<GameType>;
export const fetchGame: FetchGame = async ({ id }) => {
  return await Game.findById(id)
    .populate("teamOne")
    .populate("teamTwo")
    .populate("creator");
};

type CreateGame = (args: { newGame: CreateGameInput }) => Promise<GameType>;
export const createGame: CreateGame = async ({ newGame }) => {
  const game = new Game(newGame);
  return await game.save();
};

type FetchMyGames = (args: {
  playerId: string;
  limit: number;
  skip: number;
}) => Promise<Array<GameType>>;
export const fetchMyGames: FetchMyGames = async ({ playerId, limit, skip }) => {
  return await Game.find({
    $or: [{ teamOne: playerId }, { teamTwo: playerId }],
  })
    .skip(skip)
    .limit(limit)
    .populate("teamOne")
    .populate("teamTwo")
    .populate("creator");
};

export type GameProvider = {
  fetchGame: FetchGame;
  createGame: CreateGame;
  fetchMyGames: FetchMyGames;
};
