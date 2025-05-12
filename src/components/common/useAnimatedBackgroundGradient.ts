import { useEffect, useState } from "react";
import { GetContrastingColors } from "./GetContrastingColors";

/**
 * Sets an animated background gradient on the document body.
 * Returns the current [primary, secondary] colors and hue value.
 * Cleans up and restores the previous background/transition on unmount.
 */
export function useAnimatedBackgroundGradient() {
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
  return { hue, primary, secondary };
}
