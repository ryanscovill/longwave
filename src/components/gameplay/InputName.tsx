import React, { useRef, useEffect } from "react";
import { CenteredColumn } from "../common/LayoutElements";
import { LongwaveAppTitle } from "../common/Title";
import { useTranslation } from "react-i18next";
import { StyledInput } from "../common/StyledInput";
import { Button } from "../common/Button";

export function InputName(props: { setName: (name: string) => void; name?: string }) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(props.name || "");
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <CenteredColumn>
      <LongwaveAppTitle />
      <div>{t("inputname.your_name")}:</div>
      <StyledInput
        type="text"
        style={{ margin: 16 }}
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={(event) => {
          if (!inputRef.current) {
            return false;
          }
          if (event.key !== "Enter") {
            return true;
          }
          props.setName(value);
        }}
      />
      <Button
        text={t("inputname.join_game", "Join Game")}
        onClick={() => {
          if (inputRef.current) {
            props.setName(value);
          }
        }}
      />
    </CenteredColumn>
  );
}
