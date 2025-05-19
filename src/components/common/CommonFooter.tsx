import { useTranslation } from "react-i18next";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { glassmorphicStyle } from "./glassmorphicStyle";

export function CommonFooter() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
        }}
      >
        <div
          onClick={() => setIsVisible(!isVisible)}
          style={{
            cursor: "pointer",
            padding: 8,
            ...glassmorphicStyle,
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
      </div>
      {isVisible && (
        <CenteredRow
          style={{
            color: "black",
            fontSize: "small",
            maxWidth: 700,
            margin: "auto",
            padding: 16,
            ...glassmorphicStyle,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <CenteredColumn>
            <p style={{ margin: 8 }}>
              <Link href="https://www.wavelength.zone" text="Wavelength" />{" "}
              {t("commonfooter.developed_by")}{" "}
              <Link
                href="https://github.com/cynicaloptimist/longwave"
                text={t("commonfooter.adapted_for_web")}
              />{" "}
              {t("commonfooter.adapted_for_web_by")}
            </p>
            {/* we want referrer, so: */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a target="_blank" href="https://www.patreon.com/improvedinitiative">
              <img
                alt="Patreon logo"
                title={t("commonfooter.support_patreon").toString()}
                src="./Digital-Patreon-Wordmark_FieryCoral.png"
                style={{ width: "150px", margin: 8 }}
              />
            </a>
          </CenteredColumn>
          <AffiliateLink />
        </CenteredRow>
      )}
    </div>
  );
}

function Link(props: { href: string; text: string }) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
}

function AffiliateLink() {
  return (
    /* eslint-disable-next-line react/jsx-no-target-blank */
    <a target="_blank" href="https://amzn.to/44WVTuT">
      <img
        width="100px"
        alt="Wavelength board game on Amazon"
        src="./wavelength_box_small.jpg"
      />
    </a>
  );
}
