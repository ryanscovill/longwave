import { render, fireEvent, within, waitFor } from "@testing-library/react";
import { act } from "react";
import { InitialGameState, GameState, Team } from "../../state/GameState";
import { JoinTeam } from "./JoinTeam";
import { TestContext } from "./TestContext";

test("Assigns player to the selected team", async () => {
  const gameState: GameState = {
    ...InitialGameState(""),
    players: {
      player1: {
        name: "Player",
        team: Team.Unset,
      },
    },
  };

  const setState = jest.fn();
  
  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="player1" setState={setState}>
        <JoinTeam />
      </TestContext>
    );
  });

  let leftBrain: HTMLElement | null = null;

  await waitFor(() => {
    leftBrain = component!.getByText("LEFT BRAIN");
    return leftBrain;
  });

  expect(leftBrain).toBeInTheDocument();

  // Find the specific "Join" button for the left team (not the title)
  // Look for buttons with exact text "Join" (not "Join a Team")
  const joinButtons = component!.getAllByText((content, element) => {
    return content === "Join" && element?.tagName === "BUTTON";
  });
  
  expect(joinButtons.length).toBeGreaterThan(0);

  await act(async () => {
    await fireEvent.click(joinButtons[0]);
  });

  expect(setState).toHaveBeenCalledWith({
    players: {
      player1: {
        id: "player1",
        name: "Player",
        team: Team.Left,
      },
    },
  });
});

test("Shows current team members", async () => {
  const gameState: GameState = {
    ...InitialGameState(""),
    players: {
      playerId: {
        name: "Player",
        team: Team.Unset,
      },
      leftTeam1: {
        name: "Left Team 1",
        team: Team.Left,
      },
      leftTeam2: {
        name: "Left Team 2",
        team: Team.Left,
      },
      rightTeam1: {
        name: "Right Team 1",
        team: Team.Right,
      },
      rightTeam2: {
        name: "Right Team 2",
        team: Team.Right,
      },
    },
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="player1">
        <JoinTeam />
      </TestContext>
    );
  });

  const leftBrain = within(component!.getByText("LEFT BRAIN").parentElement!);
  expect(leftBrain.getByText("Left Team 1")).toBeInTheDocument();
  expect(leftBrain.getByText("Left Team 2")).toBeInTheDocument();

  const rightBrain = within(component!.getByText("RIGHT BRAIN").parentElement!);
  expect(rightBrain.getByText("Right Team 1")).toBeInTheDocument();
  expect(rightBrain.getByText("Right Team 2")).toBeInTheDocument();
});
