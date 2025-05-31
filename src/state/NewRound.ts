import { RoundPhase, GameState, Team, TeamReverse, GameType } from "./GameState";
import { RandomSpectrumTarget } from "./RandomSpectrumTarget";
import { BuildGameModel } from "./BuildGameModel";
import { TFunction } from "i18next";

export function NewRound(
  playerId: string,
  gameState: GameState,
  tSpectrumCards: TFunction<"spectrum-cards">
): Partial<GameState> {
  const gameModel = BuildGameModel(
    gameState,
    () => {},
    playerId,
    tSpectrumCards,
    () => {}
  );

  // Get all players in the next team
  const nextTeam = gameState.gameType === GameType.Teams ? TeamReverse(gameState.clueGiverTeam) : Team.Unset;
  const teamPlayers = Object.entries(gameState.players)
    .filter(([_, player]) => player.team === nextTeam)
    .map(([id, _]) => id);

  // If no players in the team, keep the same team
  const newClueGiverTeam = teamPlayers.length > 0 ? nextTeam : gameState.clueGiverTeam;

  // Find the next clue giver in the team
  let nextClueGiver = playerId;
  if (gameState.gameType === GameType.Teams) {
    // Get the last player from the next team
    const lastPlayer = nextTeam === Team.Left ? gameState.lastLeftTeamPlayer : gameState.lastRightTeamPlayer;
    
    // Find the index of the last player in the team
    const lastIndex = teamPlayers.indexOf(lastPlayer);
    
    // If last player not found or no last player, start from beginning
    const nextIndex = lastIndex === -1 ? 0 : (lastIndex + 1) % teamPlayers.length;
    nextClueGiver = teamPlayers[nextIndex];
  }

  // Ensure we have a valid clue giver
  if (!nextClueGiver || !gameState.players[nextClueGiver]) {
    // If no valid clue giver found, use the first available player
    const availablePlayers = Object.keys(gameState.players);
    if (availablePlayers.length > 0) {
      nextClueGiver = availablePlayers[0];
    } else {
      // If no players at all, return to setup phase
      return {
        roundPhase: RoundPhase.SetupGame,
        clueGiver: "",
        clueGiverTeam: Team.Left,
      };
    }
  }

  const newState: Partial<GameState> = {
    clueGiver: nextClueGiver,
    clueGiverTeam: newClueGiverTeam,
    // Update the last player for the team that just played
    lastLeftTeamPlayer: gameState.clueGiverTeam === Team.Left ? gameState.clueGiver : gameState.lastLeftTeamPlayer,
    lastRightTeamPlayer: gameState.clueGiverTeam === Team.Right ? gameState.clueGiver : gameState.lastRightTeamPlayer,
    roundPhase: RoundPhase.GiveClue,
    deckIndex: gameState.deckIndex + 1,
    turnsTaken: gameState.turnsTaken + 1,
    spectrumTarget: RandomSpectrumTarget(),
    timerStartTime: null, // Reset timer for new round
  };

  if (gameModel.clueGiver !== null) {
    newState.previousTurn = {
      spectrumCard: gameModel.spectrumCard,
      spectrumTarget: gameState.spectrumTarget,
      clueGiverName: gameModel.clueGiver.name,
      clue: gameState.clue,
      guess: gameState.guess,
    };
  }

  return newState;
}
