import { FinalFrame, RegularFrame } from "../frames";

class BowlingService {
  #playerName;
  #rollIdx;
  #regularFrames;
  #finalFrame;
  #frameIdx;
  #isOver;

  constructor(playerName = "Sir Bowlin Atkinson") {
    this.#playerName = playerName;
    this.rolls = new Map();
    this.#rollIdx = 0;
    this.#frameIdx = 0;
    this.#regularFrames = [...Array(9).keys()].map(
      () => new RegularFrame(this.rolls)
    );
    this.#finalFrame = new FinalFrame(this.rolls);
    this.#isOver = false;
  }

  getPlayerName() {
    return this.#playerName;
  }

  #getCurrentFrame() {
    if (this.#frameIdx < 9) {
      return this.#regularFrames[this.#frameIdx];
    } else {
      return this.#finalFrame;
    }
  }

  getRollNumber() {
    return this.#rollIdx;
  }

  getStandingPins() {
    return this.#getCurrentFrame().getStandingPins();
  }

  // Handle new rolls
  bowl(pins) {
    if (this.#isOver) {
      throw new Error("Game over! Refresh to play again.");
    } else if (isNaN(pins) || pins > this.getStandingPins()) {
      throw new Error(
        `Pins must be a number ${this.getStandingPins()} or less`
      );
    }

    // Store pin information
    this.rolls.set(this.#rollIdx, pins);
    this.#getCurrentFrame().bowl(pins);
    this.#rollIdx++;

    // Decide on next action
    if (this.#getCurrentFrame().getStandingPins() > 0) {
      // Keep playing
      return;
    } else if (this.#frameIdx < 9) {
      // Next frame
      this.#frameIdx++;
    } else {
      // Game over
      this.#isOver = true;
    }
  }

  displayScore() {
    return (
      this.#regularFrames.reduce(
        (score, frame) => score + frame.getScore(),
        0
      ) + this.#finalFrame.getScore()
    );
  }

  displayRegularFrames() {
    let runningTotal = 0;
    return this.#regularFrames.map((frame, i) => {
      const frameScore = frame.getScore();
      runningTotal = frameScore !== null ? runningTotal + frameScore : null;
      console.log("status", i, frame.displayRolls(), frame.getScore());
      return {
        rolls: frame.displayRolls(),
        score: runningTotal,
      };
    });
  }

  displayFinalFrame() {
    return {
      rolls: this.#finalFrame.displayRolls(),
      score: this.#isOver ? this.displayScore() : null,
    };
  }
}

export default BowlingService;
