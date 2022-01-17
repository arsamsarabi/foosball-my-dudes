import { CreateGameInput, Game as GameType } from "../../../generated/schema";
import { Game } from "./model";

type FetchGame = (args: { id: string }) => Promise<GameType>;
export const fetchGame: FetchGame = async ({ id }) => {
  return await Game.findById(id);
};

type CreateGame = (args: { newGame: CreateGameInput }) => Promise<GameType>;
export const createGame: CreateGame = async ({ newGame }) => {
  const game = new Game(newGame);
  return await game.save();
};

export type GameProvider = {
  fetchGame: FetchGame;
  createGame: CreateGame;
};
