import React from "react";

export function Button(props: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      style={{
        padding: "8px 18px",
        marginTop: 8,
        marginBottom: 8,
        background: "#7fd0f9",
        color: "#222",
        border: "none",
        borderRadius: 16,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 1,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        cursor: props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
        transition: "background 0.2s, color 0.2s, opacity 0.2s",
        outline: "none"
      }}
      onClick={props.onClick}
      disabled={props.disabled}
      onMouseOver={e => {
        if (!props.disabled) e.currentTarget.style.background = '#a3e0ff';
      }}
      onMouseOut={e => {
        if (!props.disabled) e.currentTarget.style.background = '#7fd0f9';
      }}
    >
      {props.text}
    </button>
  );
}
