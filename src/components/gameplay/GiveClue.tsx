import React, { useRef, useContext, useState } from "react";
import { motion } from "framer-motion";

import { GameType, RoundPhase } from "../../state/GameState";
import { Spectrum } from "../common/Spectrum";
import { CenteredColumn, CenteredRow } from "../common/LayoutElements";
import { Button } from "../common/Button";
import { GameModelContext } from "../../state/GameModelContext";
import { RandomSpectrumTarget } from "../../state/RandomSpectrumTarget";
import { Info } from "../common/Info";
import { useTranslation } from "react-i18next";
import { StyledInput } from "../common/StyledInput";

export function GiveClue() {
  const { t } = useTranslation();
  const {
    gameState,
    localPlayer,
    clueGiver,
    spectrumCard,
    setGameState,
  } = useContext(GameModelContext);
  const inputElement = useRef<HTMLInputElement>(null);
  const [disableSubmit, setDisableSubmit] = useState(
    !inputElement.current?.value?.length
  );

  if (!clueGiver) {
    setGameState({
      clueGiver: localPlayer.id,
    });
    return null;
  }

  if (localPlayer.id !== clueGiver.id) {
    return (
      <div>
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Spectrum spectrumCard={spectrumCard} />
        </motion.div>
        <CenteredColumn>
          <div>
            {t("giveclue.waiting_for_clue", { givername: clueGiver.name })}
          </div>
        </CenteredColumn>
      </div>
    );
  }

  const submit = () => {
    if (!inputElement.current?.value?.length) {
      return false;
    }

    setGameState({
      clue: inputElement.current.value,
      guess: 10,
      roundPhase: RoundPhase.MakeGuess,
    });
  };

  const redrawCard = () =>
    setGameState({
      deckIndex: gameState.deckIndex + 1,
      spectrumTarget: RandomSpectrumTarget(),
    });

  return (
    <div>
      {gameState.gameType !== GameType.Cooperative && (
        <CenteredColumn style={{ alignItems: "flex-end" }}>
          <Button text={t("giveclue.draw_other_hand")} onClick={redrawCard} />
        </CenteredColumn>
      )}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <Spectrum
          targetValue={gameState.spectrumTarget}
          spectrumCard={spectrumCard}
        />
      </motion.div>
      <CenteredColumn>
        <CenteredRow style={{ marginTop: 16 }}>
          <StyledInput
            type="text"
            placeholder={t("giveclue.clue").toString()}
            ref={inputElement}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key !== "Enter") {
                return true;
              }
              submit();
            }}
            onChange={() =>
              setDisableSubmit(!inputElement.current?.value?.length)
            }
          />
          <Info>
            <div>
              {t("giveclue.instructions")}
              <ul>
                <li>{t("giveclue.focus1")}</li>
                <li>{t("giveclue.focus2")}</li>
                <li>{t("giveclue.focus3")}</li>
                <li>{t("giveclue.focus4")}</li>
              </ul>
            </div>
          </Info>
        </CenteredRow>
        <Button
          text={t("giveclue.give_clue")}
          onClick={submit}
          disabled={disableSubmit}
        />
      </CenteredColumn>
    </div>
  );
}
