import { useRef, useState } from "react";
import BowlingService from "../../services/bowling-service";
import Scoreboard from "../scoreboard";
import ScoreInput from "../score-input";

const GameContainer = () => {
  const gameRef = useRef(new BowlingService());
  const game = gameRef.current;
  const [frame, setFrame] = useState(0);
  const [roll, setRoll] = useState(0);
  const [score, setScore] = useState(0);

  const bowl = (pins) => {
    game.bowl(pins);
    setRoll(game.rollNum);
    setFrame(game.frameNum);
    setScore(game.getGameScore());
  };

  return (
    <div className="game-container">
      <Scoreboard
        frameScores={game.displayFrames()}
        frame={frame}
        roll={roll}
        playerName={game.playerName}
        score={score}
      />
      <ScoreInput bowl={bowl} />
    </div>
  );
};

export default GameContainer;
