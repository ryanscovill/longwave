import React from "react";
import { GetContrastingColors } from "./GetContrastingColors";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LongwaveAppTitle({ size = "small" }: { size?: "large" | "small" }) {
  const { t } = useTranslation();
  const [hue, setHue] = useState(0);
  const [primary, secondary] = GetContrastingColors(hue);
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((hue) => (hue + 1) % 360);
    }, 5);
    return () => clearInterval(interval);
  });
  
  // Responsive font sizes
  const baseFontSize = size === "large" ? "7rem" : "4rem";
  const mobileSize = size === "large" ? "3.5rem" : "2.5rem";
  const tabletSize = size === "large" ? "5rem" : "3rem";
  
  const strokeWidth = size === "large" ? "2px" : "1px";
  const mobileStrokeWidth = size === "large" ? "1px" : "0.5px";
  
  return (
    <h1
      style={{
        backgroundImage: `linear-gradient(90deg, ${primary} 10%, ${secondary} 90%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: `${strokeWidth} black`,
        fontWeight: "bold",
        fontSize: baseFontSize,
        textAlign: "center",
        margin: "0 16px",
        // Media query styles will be handled by CSS classes
      }}
      className={`responsive-title ${size === "large" ? "large-title" : "small-title"}`}
    >
      {t("title.longwave")}
    </h1>
  );
}
