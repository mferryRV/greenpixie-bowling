import BowlingService from "./index";

test("creates a game with a .bowl() function", () => {
  const game = new BowlingService();
  game.bowl(10);
  expect(1).toBe(1);
});

// @TODO: UI tests

// @TODO: Tests around successive strikes in the 8th and 9th frames
// @TODO: "strike in 8th, 9th, 10th yields 30"
// @TODO: "strike in 9th, 10th, 10th yields 30"
// @TODO: "four strikes from 9th yields 30"

// Game score tests
test("game score starts at zero", () => {
  const game = new BowlingService();
  expect(game.displayScore()).toBe(0);
});

test("zero score game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 20; i++) {
    game.bowl(0);
  }
  expect(game.displayScore()).toBe(0);
});

test("low score game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 20; i++) {
    game.bowl(1);
  }
  expect(game.displayScore()).toBe(20);
});

test("example game", () => {
  const game = new BowlingService();
  [2, 4, 1, 6, 8, 2, 1, 5, 7, 2, 5, 4, 5, 5, 10, 6, 2, 4, 5].forEach((p) =>
    game.bowl(p)
  );
  expect(game.displayScore()).toBe(103);
});

test("perfect game", () => {
  const game = new BowlingService();
  for (let i = 0; i < 12; i++) {
    game.bowl(10);
  }
  expect(game.displayScore()).toBe(300);
});
