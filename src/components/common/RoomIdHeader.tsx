import { useParams } from "react-router-dom";
import { CenteredRow } from "./LayoutElements";
import { faCogs, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GameModelContext } from "../../state/GameModelContext";
import { InitialGameState } from "../../state/GameState";
import { glassmorphicStyle } from "./glassmorphicStyle";

import { useTranslation } from "react-i18next";

export function RoomIdHeader() {
  const { t } = useTranslation();
  const { roomId }: { [k: string]: any } = useParams();

  return (
    <div style={{ position: "absolute", top: 0, right: 0, zIndex: 1000, padding: 16 }}>
      <div
        style={{
          ...glassmorphicStyle,
          borderRadius: 12,
          padding: 8,
        }}
      >
        <CenteredRow
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            color: "black",
          }}
        >
          <div style={{ margin: 4, padding: 4 }}>
            {t("roomidheader.roomid")} {roomId}
          </div>
          <Tippy content={<RoomMenu />} interactive placement="bottom-end">
            <div tabIndex={0} style={{ padding: 8 }}>
              <FontAwesomeIcon icon={faCogs} />
            </div>
          </Tippy>
        </CenteredRow>
      </div>
    </div>
  );
}

function RoomMenu() {
  const { t, i18n } = useTranslation();
  const { setGameState, setPlayerName } = useContext(GameModelContext);

  const menuItemProps = {
    style: { margin: 8, cursor: "pointer" },
    tabIndex: 0,
  };

  return (
    <div>
      <div
        {...menuItemProps}
        onClick={() => setGameState(InitialGameState(i18n.language))}
      >
        <FontAwesomeIcon icon={faUndo} /> {t("roomidheader.reset_room")}
      </div>
      <div {...menuItemProps} onClick={() => setPlayerName("")}>
        <FontAwesomeIcon icon={faUserEdit} /> {t("roomidheader.change_name")}
      </div>
    </div>
  );
}
