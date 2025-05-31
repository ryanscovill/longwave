import React, { useContext, useEffect, useCallback } from "react";
import { GameType, RoundPhase, TeamName } from "../../state/GameState";
import { Spectrum } from "../common/Spectrum";
import { CenteredColumn } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { GameModelContext } from "../../state/GameModelContext";
import { RecordEvent } from "../../TrackEvent";
import { ScoreCoopRound } from "../../state/ScoreRound";
import { Timer } from "./Timer";

import { useTranslation } from "react-i18next";
import { glassmorphicStyle } from "../common/glassmorphicStyle";

export function MakeGuess() {
  const { t } = useTranslation();
  const { gameState, localPlayer, clueGiver, spectrumCard, setGameState } =
    useContext(GameModelContext);

  // Start timer when entering MakeGuess phase
  useEffect(() => {
    if (gameState.gameType === GameType.Teams && gameState.timerDuration > 0 && !gameState.timerStartTime && gameState.roundPhase === RoundPhase.MakeGuess) {
      setGameState({
        timerStartTime: Date.now(),
      });
    }
  }, [gameState.roundPhase, gameState.timerDuration, gameState.timerStartTime, gameState.gameType, setGameState]);

  const handleTimeUp = useCallback(() => {
    // When time runs out, automatically submit the current guess
    RecordEvent("timer_expired", {
      spectrum_card: spectrumCard.join("|"),
      clue: gameState.clue,
      target: gameState.spectrumTarget.toString(),
      guess: gameState.guess.toString(),
    });

    if (gameState.gameType === GameType.Teams) {
      setGameState({
        roundPhase: RoundPhase.CounterGuess,
        timerStartTime: null,
      });
    } else if (gameState.gameType === GameType.Cooperative) {
      setGameState({
        ...ScoreCoopRound(gameState),
        timerStartTime: null,
      });
    } else {
      setGameState({
        roundPhase: RoundPhase.ViewScore,
        timerStartTime: null,
      });
    }
  }, [gameState, spectrumCard, setGameState]);

  const submitGuess = useCallback(() => {
    RecordEvent("guess_submitted", {
      spectrum_card: spectrumCard.join("|"),
      clue: gameState.clue,
      target: gameState.spectrumTarget.toString(),
      guess: gameState.guess.toString(),
    });

    if (gameState.gameType === GameType.Teams) {
      setGameState({
        roundPhase: RoundPhase.CounterGuess,
        timerStartTime: null,
      });
    } else if (gameState.gameType === GameType.Cooperative) {
      setGameState({
        ...ScoreCoopRound(gameState),
        timerStartTime: null,
      });
    } else {
      setGameState({
        roundPhase: RoundPhase.ViewScore,
        timerStartTime: null,
      });
    }
  }, [gameState, spectrumCard, setGameState]);

  if (!clueGiver) {
    return null;
  }

  const notMyTurn =
    localPlayer.id === clueGiver.id ||
    (gameState.gameType === GameType.Teams &&
      localPlayer.team !== clueGiver.team);

  const guessingTeamString = TeamName(clueGiver.team, t);

  if (notMyTurn) {
    return (
      <div>
        {/* Show timer for spectators in Teams mode only */}
        {gameState.gameType === GameType.Teams && <Timer onTimeUp={handleTimeUp} />}
        <Spectrum spectrumCard={spectrumCard} guessingValue={gameState.guess} />
        <CenteredColumn style={{ marginTop: 16 }}>
          <div>
            {t("makeguess.players_clue", { givername: clueGiver.name })}:{" "}
            <strong>{gameState.clue}</strong>
          </div>
          <div>
            {t("makeguess.waiting_guessing_team", {
              guessingteam: guessingTeamString,
            })}
          </div>
          {Object.keys(gameState.players).length < 2 && (
            <div
              style={{
                ...glassmorphicStyle,
                margin: 12,
                padding: "0 1em",
                borderRadius: 12,
              }}
            >
              <p>{t("makeguess.invite_other_players")}</p>
              <p>
                {t("makeguess.share_game_url", {
                  game_url: window.location.href,
                })}
              </p>
            </div>
          )}
        </CenteredColumn>
      </div>
    );
  }

  return (
    <div>
      {/* Show timer for active guesser in Teams mode only */}
      {gameState.gameType === GameType.Teams && <Timer onTimeUp={handleTimeUp} />}
      <Spectrum
        spectrumCard={spectrumCard}
        handleValue={gameState.guess}
        onChange={(guess: number) => {
          setGameState({
            guess,
          });
        }}
      />
      <CenteredColumn style={{ marginTop: 16 }}>
        <div>
          {t("makeguess.players_clue", { givername: clueGiver.name })}:{" "}
          <strong>{gameState.clue}</strong>
        </div>
        <div>
          <Button
            text={t("makeguess.guess_for_team", {
              teamname: TeamName(localPlayer.team, t),
            })}
            onClick={submitGuess}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}
