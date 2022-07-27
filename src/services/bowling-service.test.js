import BowlingService from "./bowling-service";

test("creates a game with 10 frames", () => {
  const game = new BowlingService();
  expect(game.frames.length).toBe(10);
});

test("records score", () => {
  const game = new BowlingService();
  game.bowl(1);
  expect(game.frames[0][0]).toBe(1);
});

test("incomplete frames have no score", () => {
  const game = new BowlingService();
  game.bowl(1);
  expect(game.getFrameScore(0)).toBe(null);
});

// Frame and roll iteration tests
test("two rolls in one frame", () => {
  const game = new BowlingService();
  [1, 1].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(2);
});

test("three rolls in two frames", () => {
  const game = new BowlingService();
  [1, 2, 3].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(3);
});

test("strike moves to next frame", () => {
  const game = new BowlingService();
  [10, 4, 0].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(1)).toBe(4);
});

test("tenth frame turkey", () => {
  const game = new BowlingService();
  for (let i = 0; i < 12; i++) {
    game.bowl(10);
  }
  expect(game.getFrameScore(9)).toBe(30);
});

// Strike and spare score tests
test("strike has no immediate score", () => {
  const game = new BowlingService();
  [10, 4].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(null);
});

test("strike score after next frame", () => {
  const game = new BowlingService();
  [10, 4, 4].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(18);
});

test("strike has no score if next frame is strike", () => {
  const game = new BowlingService();
  [10, 10].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(null);
});

test("strike scores 30 if next two frames are strikes", () => {
  const game = new BowlingService();
  [10, 10, 10].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(30);
});

// TODO: Tests around successive strikes in the 8th and 9th frames

test("spare has no immediate score", () => {
  const game = new BowlingService();
  [5, 5].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(null);
});

test("spare score after next roll", () => {
  const game = new BowlingService();
  [5, 5, 4].forEach((p) => game.bowl(p));
  expect(game.getFrameScore(0)).toBe(14);
});

// Game score tests
test("game score starts at zero", () => {
  const game = new BowlingService();
  expect(game.getGameScore()).toBe(0);
});

test("zero score game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 20; i++) {
    game.bowl(0);
  }
  expect(game.getGameScore()).toBe(0);
});

test("low score game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 20; i++) {
    game.bowl(1);
  }
  expect(game.getGameScore()).toBe(20);
});

test("example game", () => {
  const game = new BowlingService();
  [2, 4, 1, 6, 8, 2, 1, 5, 7, 2, 5, 4, 5, 5, 10, 6, 2, 4, 5].forEach((p) =>
    game.bowl(p)
  );
  expect(game.getGameScore()).toBe(103);
});

test("perfect game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 12; i++) {
    game.bowl(10);
  }
  expect(game.getGameScore()).toBe(300);
});
