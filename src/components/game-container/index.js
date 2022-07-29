import { useRef, useState } from "react";
import BowlingService from "../../services/bowling";
import Scoreboard from "../scoreboard";
import ScoreInput from "../score-input";

const GameContainer = () => {
  const gameRef = useRef(new BowlingService());
  const game = gameRef.current;

  const [roll, setRoll] = useState(0);
  const [standingPins, setStandingPins] = useState(10);
  const [score, setScore] = useState(0);

  const bowl = (pins) => {
    game.bowl(pins);

    setRoll(game.getRollNumber());
    setStandingPins(game.getStandingPins());
    setScore(game.displayScore());
  };

  return (
    <div className="game-container">
      <Scoreboard
        playerName={game.getPlayerName()}
        standingPins={standingPins}
        roll={roll}
        regularFrames={game.displayRegularFrames()}
        finalFrame={game.displayFinalFrame()}
        score={score}
      />
      <ScoreInput bowl={bowl} standingPins={standingPins} />
    </div>
  );
};

export default GameContainer;
