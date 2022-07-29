import "./score-input.css";

import { useState } from "react";

const ScoreInput = ({ bowl }) => {
  const [pins, setPins] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // @TODO: Move this logic to the BowlingService
    try {
      const pinsInt = parseInt(pins);
      if (isNaN(pinsInt)) throw new Error();
      bowl(pinsInt);
    } catch (e) {
      alert("That's not an acceptable number of pins.");
    }
    setPins("");
  };

  return (
    <form onSubmit={handleSubmit} className="score-input">
      <label>
        Pins:
        <input
          type="text"
          value={pins} // @TODO: Add some kind of max: 8 language
          onChange={(e) => setPins(e.target.value)}
        />
      </label>
      <input type="submit" value="Bowl" />
    </form>
  );
};

export default ScoreInput;
