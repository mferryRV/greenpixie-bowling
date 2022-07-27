import sumFrame from "../utils/array-sum";

// class BowlingFrame {
//   constructor(frameNumber) {
//     this.frameNumber = frameNumber;
//     this.rolls = Array(frameNumber === 9 ? 3 : 2);
//   }
//   isStrike() {
//     return (
//       this.rolls.reduce((a, b) => (typeof b === "number" ? b : a), null) === 10
//     );
//   }

//   isSpare() {
//     return !this.isStrike() && this.rolls[0] + this.rolls[1] === 10;
//   }

//   isComplete() {
//     if (this.frameNumber === 9) {
//       return this.rolls[2] >= 0 || !this.isSpare() || this.rolls[1] >= 0;
//     } else {
//       return this.rolls[1] >= 0 || this.isStrike();
//     }
//   }

//   getFirstRollScore() {
//     return this.rolls[0];
//   }

//   getPins() {
//     return this.isComplete() ? sumFrame(this.rolls) : null;
//   }
// }

class BowlingService {
  constructor(playerName = "Sir Bowlin Atkinson") {
    this.playerName = playerName;
    this.gameOn = true;

    // Games have 10 frames
    this.frames = [...Array(10).keys()]
      // Each frame has 2 rolls, or three for the final frame
      .map((f) => Array(f < 9 ? 2 : 3));

    // Use indices to treat the game like a nested for loop
    // Iterating a 10x2 (+1 at the end) empty matrix
    this.frameNum = 0;
    this.rollNum = 0;
  }

  bowl(numberPins) {
    if (!this.gameOn) return;
    // What if the number of pins is invalid for the frame?

    // Mark score
    const currentFrame = this.frames[this.frameNum];
    currentFrame[this.rollNum] = numberPins;

    console.log("status", this.frameNum, this.rollNum, numberPins);

    const frameScore = sumFrame(currentFrame);

    // Move indices
    if (this.rollNum === 0 && numberPins < 10) {
      // No strike, roll again
      this.rollNum++;
    } else if (this.frameNum < 9) {
      // End of turn, next frame
      this.rollNum = 0;
      this.frameNum++;
    } else if (this.rollNum < 2 && [10, 20].includes(frameScore)) {
      // Last frame, all pins are down, roll again
      this.rollNum++;
    } else {
      // Game over
      this.gameOn = false;
    }
  }

  getFrameScore(frameNumber) {
    if (frameNumber > this.frames.length || 0 > frameNumber) {
      throw new Error(`${frameNumber} is not a valid frame index`);
    } else if (this.gameOn && this.frameNum <= frameNumber) {
      // No scores for incomplete frames
      return null;
    }

    const scoredFrame = this.frames[frameNumber];
    const framePins = sumFrame(scoredFrame);

    // Refactor to frame.isStrike(), maybe frame.isSpare()?
    const isStrike =
      scoredFrame.reduce((a, b) => (typeof b === "number" ? b : a), null) ===
      10;

    if (frameNumber < 9 && framePins < 10) {
      // Normal rolls, normal scores
      return framePins;
    } else if (frameNumber < 9 && isStrike) {
      // Strikes get full value of next frame
      const nextFrameScore = this.getFrameScore(frameNumber + 1);
      // If next frame isn't scored, wait
      if (nextFrameScore !== null) {
        return Math.min(framePins + nextFrameScore, 30);
      } else if (nextFrameScore === null && this.frameNum - frameNumber > 2) {
        return 30;
      } else {
        return null;
      }
    } else if (frameNumber < 9) {
      // Spares get full value of next frame
      const nextRollScore = this.frames[frameNumber + 1][0];
      // If next roll isn't scored, wait
      return nextRollScore >= 0 ? framePins + nextRollScore : null;
    } else {
      // Last frame scoring
      return framePins;
    }
  }

  getScoreAtFrame(frameNumber) {
    return [...Array(frameNumber + 1).keys()].reduce(
      (score, frame) => score + this.getFrameScore(frame),
      0
    );
  }

  getGameScore() {
    return this.getScoreAtFrame(9);
  }

  displayFrames() {
    return this.frames.map((frame, frameNumber) => {
      const rolls = frame.map((pins, roll, rolls) => {
        if (pins === 10) {
          return "X";
        } else if (roll > 0 && pins + rolls[roll - 1] === 10) {
          return "/";
        } else if (pins >= 0) {
          return `${pins}`;
        } else {
          return " ";
        }
      });

      const score =
        this.getFrameScore(frameNumber) !== null
          ? this.getScoreAtFrame(frameNumber)
          : null;
      return { score, rolls };
    });
  }
}

export default BowlingService;
