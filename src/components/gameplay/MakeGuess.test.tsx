import { GameState, InitialGameState, Team } from "../../state/GameState";
import { MakeGuess } from "./MakeGuess";
import { render } from "@testing-library/react";
import { act } from "react";
import { TestContext } from "./TestContext";

test("Should show help text when more players are needed", async () => {
  const gameState: GameState = {
    ...InitialGameState(""),
    players: {
      player1: {
        name: "Player 1",
        team: Team.Left,
      },
    },
    clueGiver: "player1",
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="player1">
        <MakeGuess />
      </TestContext>
    );
  });

  const subject = component!.queryByText(/Invite other players to join the game/);
  expect(subject).toBeInTheDocument();
});

test("Should not show help text when enough players are present", async () => {
  const gameState: GameState = {
    ...InitialGameState(""),
    players: {
      player1: {
        name: "Player 1",
        team: Team.Left,
      },
      player2: {
        name: "Player 2",
        team: Team.Left,
      },
    },
    clueGiver: "player1",
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="player1">
        <MakeGuess />
      </TestContext>
    );
  });

  const subject = component!.queryByText(/Invite other players to join the game/);
  expect(subject).not.toBeInTheDocument();
});

test("Should show button to submit your team's guess", async () => {
  const gameState: GameState = {
    ...InitialGameState(""),
    players: {
      player1: {
        name: "Player 1",
        team: Team.Left,
      },
      player2: {
        name: "Player 2",
        team: Team.Left,
      },
    },
    clueGiver: "player2",
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="player1">
        <MakeGuess />
      </TestContext>
    );
  });

  const subject = component!.getByText(/Submit Guess for LEFT BRAIN/);

  expect(subject).toBeInTheDocument();
});
