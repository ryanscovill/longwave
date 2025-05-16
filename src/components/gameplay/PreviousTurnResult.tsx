import React from "react";
import { TurnSummaryModel } from "../../state/GameState";
import { CenteredColumn } from "../common/LayoutElements";
import { Spectrum } from "../common/Spectrum";

import { useTranslation } from "react-i18next";

export function PreviousTurnResult(props: TurnSummaryModel) {
  const { t } = useTranslation();
  const style: React.CSSProperties = {
    borderTop: "1px solid black",
    margin: 16,
    paddingTop: 16,
  };

  return (
    <div style={{ ... style }}>
      <CenteredColumn>
        <em>{t("previousturnresult.previous_game")}</em>
      </CenteredColumn>
      <div
        style={{ ...style,
          position: "relative",
          opacity: 0.5,
        }}
      >
        {/* Removed glassStyle overlay */}
        <Spectrum
          spectrumCard={props.spectrumCard}
          handleValue={props.guess}
          targetValue={props.spectrumTarget}
        />
        <CenteredColumn>
          <div>
            {t("previousturnresult.player_clue", {
              givername: props.clueGiverName,
            })}
            : <strong>{props.clue}</strong>
          </div>
        </CenteredColumn>
      </div>
    </div>
  );
}
