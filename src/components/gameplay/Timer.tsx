import React, { useState, useEffect, useContext, useRef } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface TimerProps {
  onTimeUp: () => void;
}

export function Timer({ onTimeUp }: TimerProps) {
  const { t } = useTranslation();
  const { gameState } = useContext(GameModelContext);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  
  // Use ref to store the latest callback without causing useEffect to restart
  const onTimeUpRef = useRef(onTimeUp);
  
  // Update the ref when callback changes, but don't restart the timer
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (gameState.timerDuration === 0 || !gameState.timerStartTime) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - gameState.timerStartTime!) / 1000;
      const remaining = Math.max(0, gameState.timerDuration - elapsed);
      
      setTimeLeft(remaining);
      setIsWarning(remaining <= 10 && remaining > 0);

      if (remaining <= 0) {
        clearInterval(interval);
        // Use the ref to call the latest callback
        onTimeUpRef.current();
      }
    }, 100);

    return () => clearInterval(interval);
    // Only depend on timer duration and start time, not the callback
  }, [gameState.timerDuration, gameState.timerStartTime]);

  if (gameState.timerDuration === 0 || !gameState.timerStartTime) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const displayTime = minutes > 0 
    ? `${minutes}:${seconds.toString().padStart(2, '0')} s `
    : `${seconds}(s)`;

  const progressPercentage = (timeLeft / gameState.timerDuration) * 100;

  return (
    <div style={{ 
      textAlign: "center",
      marginBottom: 16,
    }}>
      <div style={{ 
        fontSize: "1.2em", 
        fontWeight: 500, 
        fontFamily: "monospace",
        color: isWarning ? "#ff6464" : "#ffffff",
        textShadow: "0 2px 4px rgba(0,0,0,0.3)"
      }}>
        {displayTime}
      </div>
      
      {/* Progress bar */}
      <div style={{
        width: "100%",
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 2,
        marginTop: 12,
        overflow: "hidden"
      }}>
        <motion.div
          style={{
            height: "100%",
            backgroundColor: isWarning ? "#ff6464" : "#4CAF50",
            borderRadius: 2,
          }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
} 