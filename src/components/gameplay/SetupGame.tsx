import React, { useEffect, useState } from "react";
import { GameType, RoundPhase } from "../../state/GameState";
import { CenteredRow, CenteredColumn } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { LongwaveAppTitle } from "../common/Title";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { NewRound } from "../../state/NewRound";
import { GetContrastingColors } from "../common/GetContrastingColors";

import { useTranslation } from "react-i18next";

export function SetupGame() {
  const { t } = useTranslation();
  const cardsTranslation = useTranslation("spectrum-cards");
  const { gameState, setGameState, localPlayer } = useContext(GameModelContext);

  // Animated background gradient like LongwaveAppTitle
  const [hue, setHue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);
  const [primary, secondary] = GetContrastingColors(hue);
  useEffect(() => {
    const prevBackground = document.body.style.background;
    const prevTransition = document.body.style.transition;
    document.body.style.transition = "background 1.8s cubic-bezier(0.4,0,0.2,1)";
    document.body.style.background = `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`;
    return () => {
      document.body.style.background = prevBackground;
      document.body.style.transition = prevTransition;
    };
  }, [primary, secondary]);

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
