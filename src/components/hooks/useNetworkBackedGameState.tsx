import { useState, useEffect } from "react";
import { DataSnapshot, getDatabase, onValue, ref, set } from "firebase/database";
import { GameState, InitialGameState, Team } from "../../state/GameState";
import { useTranslation } from "react-i18next";

export function useNetworkBackedGameState(
  roomId: string,
  playerId: string,
  playerName: string
): [GameState, (newState: Partial<GameState>) => void] {
  const { i18n } = useTranslation("spectrum-cards");
  const [gameState, setGameState] = useState<GameState>(
    InitialGameState(i18n.language)
  );

  useEffect(() => {
    const roomRef = ref(getDatabase(), `rooms/${roomId}`);

    const unsubscribe = onValue(roomRef, (appState: DataSnapshot) => {
      const networkGameState = (appState.val() as GameState | null) ?? null;
      const completeGameState: GameState = {
        ...InitialGameState(i18n.language),
        ...(networkGameState ?? {}),
      } as GameState;

      if (networkGameState?.roundPhase === undefined) {
        set(roomRef, completeGameState);
        return;
      }

      if (completeGameState.players[playerId] === undefined) {
        completeGameState.players[playerId] = {
          name: playerName,
          team: Team.Unset,
        };
        set(roomRef, completeGameState);
        return;
      }

      setGameState(completeGameState);
    });
    return () => unsubscribe();
  }, [playerId, playerName, roomId, i18n]);

  const roomRef = ref(getDatabase(), `rooms/${roomId}`);

  return [
    gameState,
    (newState: Partial<GameState>) => {
  set(roomRef, {
        ...gameState,
        ...newState,
      });
    },
  ];
}
