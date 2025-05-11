import React, { useEffect } from "react";
import Slider from "rc-slider";
import { CenteredColumn, CenteredRow } from "./LayoutElements";
import { GetContrastingColors } from "./GetContrastingColors";
import { GetContrastingText } from "./GetContrastingText";

import { useTranslation } from "react-i18next";

export function Spectrum(props: {
  spectrumCard: [string, string];
  handleValue?: number;
  targetValue?: number;
  guessingValue?: number;
  onChange?: (newValue: number) => void;
}) {
  const { t } = useTranslation();

  const [primary, secondary] = GetContrastingColors(
    getStringHash(props.spectrumCard[0])
  );
  const cardBackStyle: React.CSSProperties = {
    padding: 8,
    fontWeight: "bold",
  };
  const primaryText = GetContrastingText(primary);
  const secondaryText = GetContrastingText(secondary);

  let handleStyle: React.CSSProperties = {
    height: 24,
    width: 24,
    bottom: -7,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "black",
  };

  const dotStyle = {
    ...handleStyle,
    cursor: "auto",
    bottom: -11,
    borderWidth: 5,
    transform: "translateX(-5px)",
  };

  if (!props.onChange) {
    handleStyle.cursor = "auto";
    handleStyle.boxShadow = "none";
  }

  if (props.handleValue === undefined) {
    handleStyle.display = "none";
  }

  let marks: {
    [n: number]: { style: React.CSSProperties; label: string };
  } = {};

  // Add special marks for target and guessing values (these will override the hash marks)
  if (props.targetValue !== undefined) {
    marks[props.targetValue] = {
      style: { fontWeight: "bold", color: "black", cursor: "auto", marginTop: 2 },
      label: t("spectrum.target"),
    };
  }

  if (props.guessingValue !== undefined) {
    marks[props.guessingValue] = {
      style: { fontWeight: "bold", color: "black", cursor: "auto", marginTop: 2 },
      label: t("spectrum.guessing"),
    };
  }

  // Set the page background to a linear gradient of the primary and secondary colors
  useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`;
    return () => {
      document.body.style.background = prevBackground;
    };
  }, [primary, secondary]);

  return (
    <div style={{ padding: 8 }}>
      <CenteredColumn style={{ alignItems: "stretch" }}>
        <CenteredRow style={{ justifyContent: "space-between" }}>
          <div style={{ ...cardBackStyle, backgroundColor: primary, color: primaryText }}>
            {props.spectrumCard[0]}
          </div>
          <div style={{ ...cardBackStyle, backgroundColor: secondary, color: secondaryText }}>
            {props.spectrumCard[1]}
          </div>
        </CenteredRow>
        <CenteredRow style={{ justifyContent: "space-between", position: "relative", height: 16, marginBottom: 0 }}>
          {/* Hash marks above the slider */}
          <div style={{
            position: "absolute",
            left: 32,
            right: 32,
            top: 35,
            height: 16,
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            pointerEvents: "none",
            zIndex: 0,
          }}>
            {Array.from({ length: 21 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: 12,
                  background: i === 0 || i === 20 ? "transparent" : "#888",
                  borderRadius: 1,
                  margin: 0,
                  alignSelf: "flex-start",
                }}
              />
            ))}
          </div>
        </CenteredRow>
        <div style={{ padding: "16px 32px" }}>
          <Slider
            min={0}
            max={20}
            value={props.handleValue}
            trackStyle={{
              backgroundColor: "transparent",
            }}
            railStyle={{
              background: `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`,
              height: 8,
            }}
            handleStyle={handleStyle}
            onChange={props.onChange}
            marks={marks}
            dotStyle={dotStyle}
          />
        </div>
      </CenteredColumn>
    </div>
  );
}

function getStringHash(value: string) {
  let acc = 0;
  for (let i = 0; i < value.length; i++) {
    acc += value.charCodeAt(i);
  }
  return acc;
}
