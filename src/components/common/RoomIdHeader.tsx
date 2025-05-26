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
import { useMediaQuery } from "react-responsive";

export function RoomIdHeader() {
  const { t } = useTranslation();
  const { roomId }: { [k: string]: any } = useParams();
  const { localPlayer } = useContext(GameModelContext);
  const isSmallScreen = useMediaQuery({ maxWidth: 1146 });

  return (
    <div style={{ 
      position: "absolute", 
      [isSmallScreen ? "bottom" : "top"]: 0, 
      right: 0, 
      zIndex: 1000, 
      padding: 8 
    }}>
      <div
        style={{
          ...glassmorphicStyle,
          borderRadius: 12,
          padding: 4,
        }}
      >
        <CenteredRow
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            color: "black",
          }}
        >
          {!isSmallScreen && (
            <div style={{ margin: 4, padding: 4, display: "flex", flexDirection: "column" }}>
              <span>{t("roomidheader.roomid")} {roomId}</span>
              {localPlayer?.name && (
                <span style={{ marginTop: 4 }}>{t("roomidheader.player_name")}: {localPlayer.name}</span>
              )}
            </div>
          )}
          <Tippy content={<RoomMenu roomId={roomId} playerName={localPlayer?.name} />} interactive placement={isSmallScreen ? "top-end" : "bottom-end"}>
            <div tabIndex={0} style={{ padding: 8 }}>
              <FontAwesomeIcon icon={faCogs} />
            </div>
          </Tippy>
        </CenteredRow>
      </div>
    </div>
  );
}

function RoomMenu({ roomId, playerName }: { roomId: string; playerName?: string }) {
  const { t, i18n } = useTranslation();
  const { setGameState, setPlayerName } = useContext(GameModelContext);
  const isSmallScreen = useMediaQuery({ maxWidth: 1146 });

  const menuItemProps = {
    style: { margin: 8, cursor: "pointer" },
    tabIndex: 0,
  };

  return (
    <div>
      {isSmallScreen && (
        <>
          <div style={{ margin: 8, padding: 8, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <div>{t("roomidheader.roomid")} {roomId}</div>
            {playerName && (
              <div style={{ marginTop: 4 }}>{t("roomidheader.player_name")}: {playerName}</div>
            )}
          </div>
        </>
      )}
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
