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
  const fontSize = size === "large" ? "7rem" : "4rem";
  const strokeWidth = size === "large" ? "2px" : "1px";
  return (
    <h1
      style={{
        backgroundImage: `linear-gradient(90deg, ${primary} 10%, ${secondary} 90%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: `${strokeWidth} black`,
        fontWeight: "bold",
        fontSize,
      }}
    >
      {t("title.longwave")}
    </h1>
  );
}
