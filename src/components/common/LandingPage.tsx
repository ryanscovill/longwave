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
      <div className="language-menu">
        <LanguageMenu />
      </div>
      <CenteredColumn className="landing-content">
        <div className="title-wrapper">
          <LongwaveAppTitle size="large" />
        </div>
        <CenteredRow className="button-wrapper">
          <Button
            text={t("landingpage.create_room")}
            onClick={() => {
              history.push("/" + RandomFourCharacterString());
            }}
          />
        </CenteredRow>
        <p className="landing-description">
          <strong>{t("landingpage.longwave")}</strong>{" "}
          {t("landingpage.adaptation")} <em>{t("landingpage.wavelength")}</em>.{" "}
          {t("landingpage.best_enjoyed")}
        </p>
      </CenteredColumn>
    </>
  );
}

function LanguageMenu() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Tippy
      interactive
      placement={isMobile ? "bottom-end" : "bottom"}
      content={<Languages />}
    >
      <span tabIndex={0} className="language-icon">
        <FontAwesomeIcon size="lg" icon={faLanguage} />
      </span>
    </Tippy>
  );
}

function Languages() {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: isMobile ? 8 : 12,
        minWidth: isMobile ? 100 : 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: "none",
        maxHeight: isMobile ? "200px" : "none",
        overflowY: isMobile ? "auto" : "visible"
      }}
    >
      {allLanguages.map((language) => (
        <button
          key={language}
          style={{
            background: "none",
            border: "none",
            textAlign: "left",
            padding: isMobile ? "4px 6px" : "6px 8px",
            cursor: "pointer",
            fontSize: isMobile ? 14 : 16,
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
