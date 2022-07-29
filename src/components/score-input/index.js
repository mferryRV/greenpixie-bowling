import "./score-input.css";

import { useState } from "react";

const ScoreInput = ({ bowl, standingPins }) => {
  const [pins, setPins] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      bowl(parseInt(pins));
    } catch (e) {
      alert(e.message);
    }
    setPins("");
  };

  return (
    <form onSubmit={handleSubmit} className="score-input">
      <label>
        Pins:
        <input
          type="text"
          value={pins}
          placeholder={`Maximum is ${standingPins}`}
          onChange={(e) => setPins(e.target.value)}
        />
      </label>
      <input type="submit" value="Bowl" />
    </form>
  );
};

export default ScoreInput;
