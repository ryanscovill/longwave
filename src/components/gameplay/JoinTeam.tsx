import React from "react";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { RoundPhase, Team, TeamName } from "../../state/GameState";
import { Button } from "../common/Button";
import { LongwaveAppTitle } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewTeamGame } from "../../state/NewGame";
import { glassmorphicStyle } from "../common/glassmorphicStyle";

import { useTranslation } from "react-i18next";
import { useAnimatedBackgroundGradient } from "../common/useAnimatedBackgroundGradient";

export function JoinTeam() {
  useAnimatedBackgroundGradient();
  const { t } = useTranslation();
  const cardsTranslation = useTranslation("spectrum-cards");
  const { gameState, localPlayer, setGameState } = useContext(GameModelContext);

  const leftTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Left
  );
  const rightTeam = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === Team.Right
  );

  const joinTeam = (team: Team) => {
    setGameState({
      players: {
        ...gameState.players,
        [localPlayer.id]: {
          ...localPlayer,
          team,
        },
      },
    });
  };

  const startGame = () =>
    setGameState(
      NewTeamGame(
        gameState.players,
        localPlayer.id,
        gameState,
        cardsTranslation.t
      )
    );

  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <div
        style={{
          ...glassmorphicStyle,
          borderRadius: 20,
          padding: 32,
          margin: 24,
          minWidth: 340,
          maxWidth: 600,
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0 0 24px 0", fontSize: 28, fontWeight: 600, letterSpacing: 1 }}>{t("jointeam.join_team")}</div>
        <CenteredRow
          style={{
            alignItems: "flex-start",
            alignSelf: "stretch",
            gap: 40,
            marginBottom: 32,
            position: "relative",
          }}
        >
          <CenteredColumn style={{ gap: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{TeamName(Team.Left, t)}</div>
            {leftTeam.map((playerId) => (
              <div key={playerId} style={{ marginBottom: 6 }}>{gameState.players[playerId].name}</div>
            ))}
            <div style={{ marginTop: 4 }}>
              <Button
                text={t("jointeam.join_left")}
                onClick={() => joinTeam(Team.Left)}
              />
            </div>
          </CenteredColumn>
          <div
            style={{
              width: 12,
              minWidth: 12,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width="12" height="120" viewBox="0 0 12 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="6,0 12,20 9,60 12,100 6,120 0,100 3,60 0,20"
                fill="rgba(255,255,255,0.35)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                style={{ filter: "blur(0.5px) drop-shadow(0 2px 8px rgba(0,0,0,0.10))" }}
              />
              <polygon
                points="6,10 10,25 8,60 10,95 6,110 2,95 4,60 2,25"
                fill="rgba(200,220,255,0.18)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.7"
              />
            </svg>
          </div>
          <CenteredColumn style={{ gap: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{TeamName(Team.Right, t)}</div>
            {rightTeam.map((playerId) => (
              <div key={playerId} style={{ marginBottom: 6 }}>{gameState.players[playerId].name}</div>
            ))}
            <div style={{ marginTop: 4 }}>
              <Button
                text={t("jointeam.join_right")}
                onClick={() => joinTeam(Team.Right)}
              />
            </div>
          </CenteredColumn>
        </CenteredRow>
        {gameState.roundPhase === RoundPhase.PickTeams && (
          <div style={{ marginTop: 24 }}>
            <Button text={t("jointeam.start_game")} onClick={startGame} />
          </div>
        )}
      </div>
    </CenteredColumn>
  );
}
