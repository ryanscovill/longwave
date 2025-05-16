import React, { forwardRef, InputHTMLAttributes } from "react";

export const StyledInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      {...props}
      style={{
        padding: "8px 14px",
        border: "1.5px solid rgba(255,255,255,0.65)",
        borderRadius: 16,
        fontSize: 16,
        outline: "none",
        margin: 4,
        background: "rgba(255,255,255,0.60)",
        color: "#222",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1.5px 8px rgba(127,208,249,0.10)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
        ...props.style,
      }}
      onFocus={e => {
        props.onFocus?.(e);
        e.currentTarget.style.borderColor = '#888';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(127,208,249,0.15)';
      }}
      onBlur={e => {
        props.onBlur?.(e);
        e.currentTarget.style.borderColor = '#b6dfff';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
      }}
    />
  )
);
StyledInput.displayName = "StyledInput";
