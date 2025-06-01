import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, DataSnapshot } from "firebase/database";
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
    const database = getDatabase();
    const dbRef = ref(database, "rooms/" + roomId);

    const unsubscribe = onValue(dbRef, (appState: DataSnapshot) => {
      const networkGameState: GameState = appState.val();
      const completeGameState = {
        ...InitialGameState(i18n.language),
        ...networkGameState,
      };

      if (networkGameState?.roundPhase === undefined) {
        set(dbRef, completeGameState);
        return;
      }

      if (completeGameState.players[playerId] === undefined) {
        completeGameState.players[playerId] = {
          name: playerName,
          team: Team.Unset,
        };
        set(dbRef, completeGameState);
        return;
      }

      setGameState(completeGameState);
    });
    
    return () => unsubscribe();
  }, [playerId, playerName, roomId, i18n]);

  return [
    gameState,
    (newState: Partial<GameState>) => {
      const database = getDatabase();
      const dbRef = ref(database, "rooms/" + roomId);
      set(dbRef, {
        ...gameState,
        ...newState,
      });
    },
  ];
}
