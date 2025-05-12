import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RandomFourCharacterString } from "../../state/RandomFourCharacterString";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { Button } from "./Button";
import { LongwaveAppTitle } from "./Title";
import { useAnimatedBackgroundGradient } from "./useAnimatedBackgroundGradient";

import { useTranslation } from "react-i18next";
import { allLanguages } from "../../i18n";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";

export function LandingPage() {
  const { t } = useTranslation();
  const history = useHistory();

  useAnimatedBackgroundGradient();

  return (
    <>
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 1000, padding: 16 }}>
        <LanguageMenu />
      </div>
      <CenteredColumn>
        <LongwaveAppTitle size="large" />
        <CenteredRow>
          <Button
            text={t("landingpage.create_room")}
            onClick={() => {
              history.push("/" + RandomFourCharacterString());
            }}
          />
        </CenteredRow>
        <p style={{ margin: 8 }}>
          <strong>{t("landingpage.longwave")}</strong>{" "}
          {t("landingpage.adaptation")} <em>{t("landingpage.wavelength")}</em>.{" "}
          {t("landingpage.best_enjoyed")}
        </p>
      </CenteredColumn>
    </>
  );
}

function LanguageMenu() {
  return (
    <Tippy
      interactive
      placement="bottom"
      content={<Languages />}
    >
      <span tabIndex={0}><FontAwesomeIcon size="lg" icon={faLanguage} /></span>
    </Tippy>
  );
}

function Languages() {
  const { i18n } = useTranslation();

  return (
    <div
      style={{
        background: "white",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 12,
        minWidth: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: "none"
      }}
    >
      {allLanguages.map((language) => (
        <button
          key={language}
          style={{
            background: "none",
            border: "none",
            textAlign: "left",
            padding: "6px 8px",
            cursor: "pointer",
            fontSize: 16,
            borderRadius: 4,
            transition: "background 0.2s",
          }}
          onClick={() => i18n.changeLanguage(language)}
          onMouseOver={e => (e.currentTarget.style.background = '#f0f0f0')}
          onMouseOut={e => (e.currentTarget.style.background = 'none')}
        >
          {language}
        </button>
      ))}
    </div>
  );
}
