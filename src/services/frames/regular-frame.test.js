import RegularFrame from "./regular";

const testRolls = (rolls, bonusRolls = []) => {
  const rollMap = new Map();
  const frame = new RegularFrame(rollMap);

  rolls.forEach((pins, idx) => {
    rollMap.set(idx, pins);
    frame.bowl(pins);
  });

  bonusRolls.forEach((pins, idx) => {
    rollMap.set(idx + rolls.length, pins);
  });

  return frame;
};

// Protection tests
test("No excess rolls", () => {
  try {
    testRolls([1, 1, 1]);
    expect(true).toBe(false);
  } catch (e) {
    // eslint-disable-next-line
    expect(e.message).toBe("Cannot bowl in completed frame");
  }
});

test("No pins > 10", () => {
  try {
    testRolls([11]);
    expect(true).toBe(false);
  } catch (e) {
    // eslint-disable-next-line
    expect(e.message).toBe("Pins must be a number between 0 and 10");
  }
});

test("No pins > standing", () => {
  try {
    testRolls([2, 9]);
    expect(true).toBe(false);
  } catch (e) {
    // eslint-disable-next-line
    expect(e.message).toBe("Pins must be a number between 0 and 8");
  }
});

test("No negative pins", () => {
  try {
    testRolls([-1]);
    expect(true).toBe(false);
  } catch (e) {
    // eslint-disable-next-line
    expect(e.message).toBe("Pins must be a number between 0 and 10");
  }
});

// Standing pin tests
test("no pins after strike", () => {
  const frame = testRolls([10]);
  expect(frame.getStandingPins()).toBe(0);
});

test("no pins after spare", () => {
  const frame = testRolls([2, 8]);
  expect(frame.getStandingPins()).toBe(0);
});

test("no pins after two rolls", () => {
  const frame = testRolls([1, 1]);
  expect(frame.getStandingPins()).toBe(0);
});

test("some pins after one roll", () => {
  const frame = testRolls([1]);
  expect(frame.getStandingPins()).toBe(9);
});

test("10 pins after gutterball", () => {
  const frame = testRolls([0]);
  expect(frame.getStandingPins()).toBe(10);
});

test("no pins after two gutterballs", () => {
  const frame = testRolls([0, 0]);
  expect(frame.getStandingPins()).toBe(0);
});

// Scoring tests
test("incomplete frames have no score", () => {
  const frame = testRolls([1]);
  expect(frame.getScore()).toBe(null);
});

test("two rolls in one frame", () => {
  const frame = testRolls([1, 1]);
  expect(frame.getScore()).toBe(2);
});

// Bonus scoring
test("strike has no score", () => {
  const frame = testRolls([10]);
  expect(frame.getScore()).toBe(null);
});

test("strike has no score after 1 bonus roll", () => {
  const frame = testRolls([10], [10]);
  expect(frame.getScore()).toBe(null);
});

test("strike has score after 2 bonus rolls", () => {
  const frame = testRolls([10], [10, 10]);
  expect(frame.getScore()).toBe(30);
});

test("spare has no score", () => {
  const frame = testRolls([2, 8]);
  expect(frame.getScore()).toBe(null);
});

test("spare has score after 1 bonus roll", () => {
  const frame = testRolls([2, 8], [2]);
  expect(frame.getScore()).toBe(12);
});

// UI tests
test("display empty", () => {
  const frame = testRolls([]);
  expect(frame.displayRolls().toString()).toBe([" ", " "].toString());
});

test("display first roll", () => {
  const frame = testRolls([1]);
  expect(frame.displayRolls().toString()).toBe(["1", " "].toString());
});

test("display second roll", () => {
  const frame = testRolls([1, 1]);
  expect(frame.displayRolls().toString()).toBe(["1", "1"].toString());
});

test("display strike", () => {
  const frame = testRolls([10]);
  expect(frame.displayRolls().toString()).toBe(["X", " "].toString());
});

test("display spare", () => {
  const frame = testRolls([2, 8]);
  expect(frame.displayRolls().toString()).toBe(["2", "/"].toString());
});
