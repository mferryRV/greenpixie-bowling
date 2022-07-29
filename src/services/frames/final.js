// @TODO: FinalFrame extends BaseFrame?
class FinalFrame {
  #standingPins;
  // @TODO: getRollNumber and getRollValue?
  #rollMap;
  #rollPointer;
  #rolls;

  constructor(rollMap) {
    this.#standingPins = 10;
    this.#rollMap = rollMap;
    this.#rollPointer = null;
    this.#rolls = 0;
  }

  getStandingPins() {
    return this.#standingPins;
  }

  // Handle new rolls
  bowl(pins) {
    if (this.#standingPins === 0) {
      throw new Error("Cannot bowl in completed frame");
    } else if (this.#standingPins < pins) {
      throw new Error("Cannot roll more pins than standing");
    }

    if (this.#rollPointer === null) {
      // Set a pointer on the first roll of each frame
      this.#rollPointer = this.#rollMap.size - 1;
    }

    this.#rolls++;
    const leftStanding = this.#standingPins - pins;

    if (this.#rolls === 3 || (this.#rolls === 2 && this.#getTotalPins() < 10)) {
      this.#standingPins = 0;
    } else if (leftStanding === 0) {
      this.#standingPins = 10;
    } else {
      this.#standingPins = leftStanding;
    }
  }

  // Calculate pins downed between start and end
  #getPins(start, end) {
    if (this.#rollPointer === null) {
      return null;
    }

    let totalPins = null;
    for (let i = start; i < end; i++) {
      totalPins += this.#rollMap.get(i);
    }

    return totalPins;
  }

  // Calculate pins downed on rolls in the frame
  #getTotalPins() {
    return this.#getPins(this.#rollPointer, this.#rollPointer + this.#rolls);
  }

  // Get total frame score
  getScore() {
    if (this.getStandingPins() > 0) {
      return null;
    }
    return this.#getTotalPins();
  }

  // Provide data for UI
  displayRolls() {
    if (this.#rollPointer === null) return [" ", " ", " "];

    let rolls = [];
    for (let i = 0; i < 3; i++) {
      const pins = this.#rollMap.get(this.#rollPointer + i);
      if (pins === 10) {
        rolls.push("X");
      } else if (i > 0 && pins + parseInt(rolls[i - 1]) === 10) {
        rolls.push("/");
      } else if (pins !== undefined) {
        rolls.push(`${pins}`);
      } else {
        rolls.push(" ");
      }
    }

    return rolls;
  }
}

export default FinalFrame;
