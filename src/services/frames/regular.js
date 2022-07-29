// @TODO: RegularFrame extends BaseFrame?
class RegularFrame {
  #standingPins;
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
    if (this.#rolls === 2 || leftStanding === 0) {
      this.#standingPins = 0;
    } else {
      this.#standingPins = leftStanding;
    }
  }

  // Calculate pins downed between start and end
  #getPins(start, end) {
    if (this.#rollPointer === null) return null;

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

  // Calculate how many bonus rolls count in score
  #bonusRolls() {
    if (this.#getTotalPins() !== 10) return 0;

    // Strikes get two bonus rolls, spares get one
    return this.#rolls === 1 ? 2 : 1;
  }

  // Get total frame score
  getScore() {
    const bonusStart = this.#rollPointer + this.#rolls;
    const bonusEnd = bonusStart + this.#bonusRolls();
    if (this.getStandingPins() > 0 || bonusEnd > this.#rollMap.size) {
      // Scoring incomplete
      return null;
    } else {
      return this.#getTotalPins() + this.#getPins(bonusStart, bonusEnd);
    }
  }

  // Provide data for UI
  displayRolls() {
    if (this.#rollPointer === null) return [" ", " "];

    let rolls = [];
    if (this.#getTotalPins() === 10 && this.#rolls === 1) {
      // Strike
      rolls.push("X");
      rolls.push(" ");
    } else if (this.#getTotalPins() === 10) {
      // Spare
      rolls.push(`${this.#rollMap.get(this.#rollPointer)}`);
      rolls.push("/");
    } else {
      // Regular score
      for (let i = 0; i < 2; i++) {
        const pins = this.#rollMap.get(this.#rollPointer + i);
        rolls.push(pins !== undefined ? `${pins}` : " ");
      }
    }

    return rolls;
  }
}

export default RegularFrame;
