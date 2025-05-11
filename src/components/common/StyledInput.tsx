import React, { forwardRef, InputHTMLAttributes } from "react";

export const StyledInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      {...props}
      style={{
        padding: "8px 14px",
        border: "1.5px solid #b6dfff",
        borderRadius: 16,
        fontSize: 16,
        outline: "none",
        margin: 4,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "border-color 0.2s, box-shadow 0.2s",
        ...props.style,
      }}
      onFocus={e => {
        props.onFocus?.(e);
        e.currentTarget.style.borderColor = '#7fd0f9';
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
