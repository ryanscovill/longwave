import { render } from "@testing-library/react";
import { act } from "react";
import { ViewScore } from "./ViewScore";
import { InitialGameState, Team, GameState, GameType } from "../../state/GameState";
import { TestContext } from "./TestContext";

const onePlayerGame: GameState = {
  ...InitialGameState(""),
  players: {
    playerId: {
      name: "Player",
      team: Team.Left,
    },
  },
  clueGiver: "playerId",
};

test("Applies 4 points for a perfect guess", async () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 1,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/Score/)).toBeInTheDocument();
  expect(component!.getByText("4")).toBeInTheDocument();
  expect(component!.getByText(/Right on target!/)).toBeInTheDocument();
});

test("Applies 2 points for off by 2", async () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 3,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/Score/)).toBeInTheDocument();
  expect(component!.getByText("2")).toBeInTheDocument();
  expect(component!.getByText(/2 away from target/)).toBeInTheDocument();
});

test("Applies 0 points for off by 3", async () => {
  const gameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 4,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/Score/)).toBeInTheDocument();
  expect(component!.getByText("0")).toBeInTheDocument();
  expect(component!.getByText(/points/)).toBeInTheDocument();
});

test("Includes the score for a correct counter guess", async () => {
  const gameState: GameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 3,
    counterGuess: "left",
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/RIGHT BRAIN/)).toBeInTheDocument();
  expect(component!.getByText(/gets/)).toBeInTheDocument();
  expect(component!.getByText(/1 point for their correct counter guess/)).toBeInTheDocument();
});

test("Includes the score for a wrong counter guess", async () => {
  const gameState: GameState = {
    ...onePlayerGame,
    spectrumTarget: 1,
    guess: 3,
    counterGuess: "right",
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/RIGHT BRAIN/)).toBeInTheDocument();
  expect(component!.getByText(/gets/)).toBeInTheDocument();
  expect(component!.getByText(/0 points for their counter guess/)).toBeInTheDocument();
});

test("Applies bonus turn for cooperative game with perfect score", async () => {
  const gameState = {
    ...onePlayerGame,
    gameType: GameType.Cooperative,
    spectrumTarget: 1,
    guess: 1,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/Score/)).toBeInTheDocument();
  expect(component!.getByText("3")).toBeInTheDocument();
  expect(component!.getByText(/bonus turn/)).toBeInTheDocument();
});

test("Ends game when one team has higher score after all rounds", async () => {
  const gameState = {
    ...onePlayerGame,
    leftScore: 10,
    rightScore: 5,
    numberOfRounds: 4,
    turnsTaken: 7,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  expect(component!.getByText(/LEFT BRAIN wins!/)).toBeInTheDocument();
});

test("Does not end game when both teams have same score", async () => {
  const gameState = {
    ...onePlayerGame,
    leftScore: 10,
    rightScore: 10,
    numberOfRounds: 4,
    turnsTaken: 7,
  };

  let component: ReturnType<typeof render>;
  await act(async () => {
    component = render(
      <TestContext gameState={gameState} playerId="playerId">
        <ViewScore />
      </TestContext>
    );
  });

  const subject = component!.queryByText(/LEFT BRAIN wins!/);
  expect(subject).toBeNull();
  expect(component!.getByText(/It's a tie!/)).toBeInTheDocument();
});
