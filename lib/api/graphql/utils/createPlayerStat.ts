import { Game, Player, PlayerStat } from "../generated/schema";

type CalcGamesWonLost = (args: { playerId: string; games: Array<Game> }) => {
  won: number;
  lost: number;
};
const calcGamesWonLost: CalcGamesWonLost = ({ playerId, games }) => {
  let won = 0;
  let lost = 0;

  games.forEach((game) => {
    if (game.teamOne.some((player) => player.id === playerId)) {
      if (game.teamOneScore > game.teamTwoScore) {
        won++;
      } else {
        lost++;
      }
    }
    if (game.teamTwo.some((player) => player.id === playerId)) {
      if (game.teamTwoScore > game.teamOneScore) {
        won++;
      } else {
        lost++;
      }
    }
  });

  return { won, lost };
};

type CalcGamesTied = (args: { playerId: string; games: Array<Game> }) => number;
const calcGamesTied: CalcGamesTied = ({ playerId, games }) => {
  let tied = 0;

  games.forEach((game) => {
    if (game.teamOneScore === game.teamTwoScore) {
      tied++;
    }
  });

  return tied;
};

type CalcGoalsScored = (args: {
  playerId: string;
  games: Array<Game>;
}) => number;
const calcGoalsScored: CalcGoalsScored = ({ playerId, games }) => {
  let goals = 0;

  games.forEach((game) => {
    if (game.teamOne.some((player) => player.id === playerId)) {
      goals += game.teamOneScore;
    }
    if (game.teamTwo.some((player) => player.id === playerId)) {
      goals += game.teamTwoScore;
    }
  });

  return goals;
};

type CalcGoalsConceded = (args: {
  playerId: string;
  games: Array<Game>;
}) => number;
const calcGoalsConceded: CalcGoalsConceded = ({ playerId, games }) => {
  let goals = 0;

  games.forEach((game) => {
    if (game.teamOne.some((player) => player.id === playerId)) {
      goals += game.teamTwoScore;
    }
    if (game.teamTwo.some((player) => player.id === playerId)) {
      goals += game.teamOneScore;
    }
  });

  return goals;
};

type CalcPlayerScore = (args: {
  gamesWon: number;
  gamesLost: number;
  gamesTied: number;
  goalsScored: number;
  goalsConceded: number;
}) => number;
const calcPlayerScore: CalcPlayerScore = ({
  gamesWon,
  gamesLost,
  gamesTied,
  goalsScored,
  goalsConceded,
}): number => {
  return (
    gamesWon * 3 +
    gamesTied -
    gamesLost * 0.5 +
    (goalsScored - goalsConceded) * 0.5
  );
};

type CreatePlayerStat = (args: {
  player: Player;
  games: Array<Game>;
}) => PlayerStat;
export const createPlayerStat: CreatePlayerStat = ({ player, games }) => {
  if (!player.id) throw new Error("Player does not exist!");

  const { won: gamesWon, lost: gamesLost } = calcGamesWonLost({
    playerId: player.id,
    games,
  });
  const gamesTied = calcGamesTied({ playerId: player.id, games });
  const goalsScored = calcGoalsScored({ playerId: player.id, games });
  const goalsConceded = calcGoalsConceded({ playerId: player.id, games });
  const playerScore = calcPlayerScore({
    gamesWon,
    gamesLost,
    gamesTied,
    goalsScored,
    goalsConceded,
  });
  return {
    playerId: player.id,
    gamesPlayed: games.length,
    gamesWon,
    gamesLost,
    gamesTied,
    goalsScored,
    goalsConceded,
    playerScore,
  };
};
