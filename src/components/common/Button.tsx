import React, { useRef } from "react";

export function Button(props: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      style={{
        padding: "8px 18px",
        marginTop: 8,
        marginBottom: 8,
        background: "rgba(255,255,255,0.60)", // More white for better contrast
        color: "#222",
        border: "1.5px solid rgba(255,255,255,0.65)",
        borderRadius: 16,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 1,
        boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1.5px 8px rgba(127,208,249,0.10)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
        transition: "background 0.2s, color 0.2s, opacity 0.2s, box-shadow 0.2s",
        outline: "none",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        position: "relative",
        zIndex: 1,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
      onMouseOver={e => {
        if (!props.disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.80)';
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(127,208,249,0.18), 0 2px 16px rgba(0,0,0,0.13)';
        }
      }}
      onMouseOut={e => {
        if (!props.disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.60)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10), 0 1.5px 8px rgba(127,208,249,0.10)';
          e.currentTarget.style.transform = 'none';
        }
      }}
      onMouseDown={e => {
        if (!props.disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.48)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(127,208,249,0.10), 0 0.5px 2px rgba(0,0,0,0.10)';
          e.currentTarget.style.transform = 'translateY(2px) scale(0.98)';
          // Add global mouseup listener
          const handleMouseUp = () => {
            if (btnRef.current) {
              btnRef.current.style.background = 'rgba(255,255,255,0.60)';
              btnRef.current.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10), 0 1.5px 8px rgba(127,208,249,0.10)';
              btnRef.current.style.transform = 'none';
            }
            window.removeEventListener('mouseup', handleMouseUp);
          };
          window.addEventListener('mouseup', handleMouseUp);
        }
      }}
      onMouseUp={e => {
        if (!props.disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.80)';
          e.currentTarget.style.boxShadow = '0 4px 18px rgba(127,208,249,0.18), 0 2px 16px rgba(0,0,0,0.13)';
          e.currentTarget.style.transform = 'none';
        }
      }}
    >
      {props.text}
    </button>
  );
}
