import FinalFrame from "./final";

const testRolls = (rolls) => {
  const rollMap = new Map();
  const frame = new FinalFrame(rollMap);

  rolls.forEach((pins, idx) => {
    rollMap.set(idx, pins);
    frame.bowl(pins);
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
    expect(e.message).toBe("Cannot roll more pins than standing");
  }
});

test("No pins > standing", () => {
  try {
    testRolls([2, 9]);
    expect(true).toBe(false);
  } catch (e) {
    // eslint-disable-next-line
    expect(e.message).toBe("Cannot roll more pins than standing");
  }
});

// Standing pin tests
test("no pins after turkey", () => {
  const frame = testRolls([10, 10, 10]);
  expect(frame.getStandingPins()).toBe(0);
});

test("no pins after bad rolls", () => {
  const frame = testRolls([1, 1]);
  expect(frame.getStandingPins()).toBe(0);
});

test("no pins after strike and bad rolls", () => {
  const frame = testRolls([10, 1, 1]);
  expect(frame.getStandingPins()).toBe(0);
});

test("10 pins after strike", () => {
  const frame = testRolls([10]);
  expect(frame.getStandingPins()).toBe(10);
});

test("10 pins after two strikes", () => {
  const frame = testRolls([10, 10]);
  expect(frame.getStandingPins()).toBe(10);
});

test("10 pins after spare", () => {
  const frame = testRolls([2, 8]);
  expect(frame.getStandingPins()).toBe(10);
});

test("some pins after bad roll", () => {
  const frame = testRolls([4]);
  expect(frame.getStandingPins()).toBe(6);
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
test("tenth frame turkey", () => {
  const frame = testRolls([10, 10, 10]);
  expect(frame.getScore()).toBe(30);
});

test("tenth frame strike and spare", () => {
  const frame = testRolls([10, 2, 8]);
  expect(frame.getScore()).toBe(20);
});

test("tenth frame spare and strike", () => {
  const frame = testRolls([2, 8, 10]);
  expect(frame.getScore()).toBe(20);
});

test("tenth frame ends in two bad rolls", () => {
  const frame = testRolls([1, 1]);
  expect(frame.getScore()).toBe(2);
});

test("tenth frame no score after strike", () => {
  const frame = testRolls([10]);
  expect(frame.getScore()).toBe(null);
});

test("tenth frame no score after two strikes", () => {
  const frame = testRolls([10, 10]);
  expect(frame.getScore()).toBe(null);
});

test("tenth frame no score after spare", () => {
  const frame = testRolls([2, 8]);
  expect(frame.getScore()).toBe(null);
});

// UI tests
test("display empty", () => {
  const frame = testRolls([]);
  expect(frame.displayRolls().toString()).toBe([" ", " ", " "].toString());
});

test("display first roll", () => {
  const frame = testRolls([1]);
  expect(frame.displayRolls().toString()).toBe(["1", " ", " "].toString());
});

test("display second roll", () => {
  const frame = testRolls([1, 1]);
  expect(frame.displayRolls().toString()).toBe(["1", "1", " "].toString());
});

test("display strike and spare", () => {
  const frame = testRolls([10, 2, 8]);
  expect(frame.displayRolls().toString()).toBe(["X", "2", "/"].toString());
});

test("display spare and strike", () => {
  const frame = testRolls([2, 8, 10]);
  expect(frame.displayRolls().toString()).toBe(["2", "/", "X"].toString());
});
