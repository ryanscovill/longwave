import React, { useState, useContext } from "react";
import { GameType, Team, TeamName } from "../../state/GameState";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { GameModelContext } from "../../state/GameModelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import { glassmorphicStyle } from "../common/glassmorphicStyle";

export function Scoreboard() {
  const { t } = useTranslation();
  const { gameState } = useContext(GameModelContext);

  const style = {
    ...glassmorphicStyle,
    paddingTop: 16,
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    maxWidth: 800,
    marginTop: 16,
  };

  if (gameState.gameType === GameType.Freeplay) {
    return (
      <CenteredColumn style={style}>
        <em>{t("scoreboard.free_play")}</em>
        <CenteredRow style={{ flexWrap: "wrap" }}>
          {Object.keys(gameState.players).map(toPlayerRow)}
        </CenteredRow>
      </CenteredColumn>
    );
  }

  if (gameState.gameType === GameType.Cooperative) {
    const cardsRemaining = 7 + gameState.coopBonusTurns - gameState.turnsTaken;
    return (
      <CenteredColumn style={style}>
        <em>
          {t("scoreboard.coop_score")}: {gameState.coopScore}{" "}
          {t("scoreboard.points")}
        </em>
        <div>
          {cardsRemaining === 0
            ? t("scoreboard.last_card")
            : t("scoreboard.card_remaining") + ": " + cardsRemaining}
        </div>
        <CenteredRow style={{ flexWrap: "wrap" }}>
          {Object.keys(gameState.players).map(toPlayerRow)}
        </CenteredRow>
      </CenteredColumn>
    );
  }

  return (
    <CenteredRow style={style}>
      <TeamColumn team={Team.Left} score={gameState.leftScore} />
      <TeamColumn team={Team.Right} score={gameState.rightScore} />
    </CenteredRow>
  );
}

function TeamColumn(props: { team: Team; score: number }) {
  const { t } = useTranslation();
  const { gameState } = useContext(GameModelContext);

  const members = Object.keys(gameState.players).filter(
    (playerId) => gameState.players[playerId].team === props.team
  );

  return (
    <CenteredColumn style={{ alignItems: "center" }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{TeamName(props.team, t)}</div>
      {members.map(toPlayerRow)}
      <div style={{ 
        marginTop: 8,
        fontWeight: 900,
        textShadow: "0 0 2px rgba(0,0,0,0.5)",
        WebkitTextStroke: "1px rgba(0,0,0,0.5)",
        fontSize: "2.5em",
        color: "white"
      }}>
        <AnimatableScore score={props.score} />
      </div>
    </CenteredColumn>
  );
}

function AnimatableScore(props: { score: number }) {
  const lastScore = useRef(props.score);

  useEffect(() => {
    lastScore.current = props.score;
  }, [props.score]);

  if (props.score - lastScore.current === 0) {
    return <span>{props.score}</span>;
  }

  return (
    <span style={{ position: "relative" }}>
      {props.score}
      <motion.span
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -52 }}
        transition={{ duration: 2, ease: 'easeIn' }}
        style={{
          position: "absolute",
          top: -16,
          right: 0,
          color: "grey",
          fontWeight: 600,
          pointerEvents: "none",
        }}
      >
        +{props.score - lastScore.current}
      </motion.span>
    </span>
  );
}

function toPlayerRow(playerId: string) {
  return <PlayerRow key={playerId} playerId={playerId} />;
}

function PlayerRow(props: { playerId: string }) {
  const { gameState, setGameState } = useContext(GameModelContext);
  const player = gameState.players[props.playerId];
  const [hovered, setHovered] = useState(false);

  const iconContainerStyle = {
    marginLeft: 4,
    width: 20,
  };

  return (
    <div
      style={{ marginLeft: 16, display: "flex", flexFlow: "row" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {player.name}
      {hovered ? (
        <div
          style={{
            ...iconContainerStyle,
            cursor: "pointer",
          }}
          onClick={() => {
            delete gameState.players[props.playerId];
            setGameState(gameState);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      ) : (
        <div style={iconContainerStyle} />
      )}
    </div>
  );
}
