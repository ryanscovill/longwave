import React from "react";
import { GameType, RoundPhase } from "../../state/GameState";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { LongwaveAppTitle } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewRound } from "../../state/NewRound";

import { useTranslation } from "react-i18next";

export function SetupGame() {
  const { t } = useTranslation();
  const cardsTranslation = useTranslation("spectrum-cards");
  const { gameState, setGameState, localPlayer } = useContext(GameModelContext);

  const startGame = (gameType: GameType) => {
    if (gameType === GameType.Teams) {
      setGameState({
        roundPhase: RoundPhase.PickTeams,
        gameType,
      });
    } else {
      setGameState({
        ...NewRound(localPlayer.id, gameState, cardsTranslation.t),
        gameType,
      });
    }
  };

  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <CenteredColumn style={{ gap: 16, marginTop: 16 }}>
        <Button
          text={t("setupgame.standard_game")}
          onClick={() => startGame(GameType.Teams)}
        />
        <Button
          text={t("setupgame.coop_game")}
          onClick={() => startGame(GameType.Cooperative)}
        />
        <Button
          text={t("setupgame.free_game")}
          onClick={() => startGame(GameType.Freeplay)}
        />
      </CenteredColumn>
    </CenteredColumn>
  );
}
