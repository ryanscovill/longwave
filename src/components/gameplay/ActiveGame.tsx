import React from "react";
import { RoundPhase, GameType, Team } from "../../state/GameState";
import { GiveClue } from "./GiveClue";
import { MakeGuess } from "./MakeGuess";
import { ViewScore } from "./ViewScore";
import { JoinTeam } from "./JoinTeam";
import { Scoreboard } from "./Scoreboard";
import { SetupGame } from "./SetupGame";
import { CounterGuess } from "./CounterGuess";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { PreviousTurnResult } from "./PreviousTurnResult";
import { glassmorphicStyle } from "../common/glassmorphicStyle";

const style: React.CSSProperties = {
  ...glassmorphicStyle,
  maxWidth: 800,
  margin: 16,
  borderRadius: 16,
};

export function ActiveGame() {
  const { gameState, localPlayer } = useContext(GameModelContext);

  if (gameState.roundPhase === RoundPhase.SetupGame) {
    return <SetupGame />;
  }

  if (
    gameState.gameType === GameType.Teams &&
    (gameState.roundPhase === RoundPhase.PickTeams ||
      localPlayer.team === Team.Unset)
  ) {
    return <JoinTeam />;
  }  return (
    <>
       <div style={{ ...style, width: "100%" }}>
        <div style={{ padding: 16 }}>
        {gameState.roundPhase === RoundPhase.GiveClue && <GiveClue />}
        {gameState.roundPhase === RoundPhase.MakeGuess && <MakeGuess />}
        {gameState.roundPhase === RoundPhase.CounterGuess && <CounterGuess />}
        {gameState.roundPhase === RoundPhase.ViewScore && <ViewScore />}
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 800 }}>
          <Scoreboard />
        </div>
      </div>
      {/* {gameState.previousTurn && (
        <PreviousTurnResult {...gameState.previousTurn} />
      )} */}
    </>
  );
}
