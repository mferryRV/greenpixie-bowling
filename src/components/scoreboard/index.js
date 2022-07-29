import "./scoreboard.css";

const Rolls = ({ rolls, frameNumber }) => {
  if (frameNumber === 9) {
    return (
      <>
        <div className="roll roll-bottom">{rolls[0]}</div>
        <div className="roll roll-box">{rolls[1]}</div>
        <div className="roll roll-box">{rolls[2]}</div>
      </>
    );
  } else {
    return (
      <>
        <div className="roll"></div>
        <div className="roll roll-box">{rolls[0]}</div>
        <div className="roll roll-box">{rolls[1]}</div>
      </>
    );
  }
};

const Scoreboard = ({ frameScores, playerName, score }) => (
  <div className="scoreboard">
    <div className="scoreboard-block player">
      <div className="heading">Name</div>
      <div className="player-name">{playerName}</div>
    </div>
    {/* @TODO: Split frames into regular frames and final frame */}
    {frameScores.map((frame, i) => (
      <div className="scoreboard-block frame">
        <div className="heading">{i + 1}</div>
        <div className="frame-grid">
          <Rolls rolls={frame.rolls} frameNumber={i} />
          <div className="frame-score">{frame.score}</div>
        </div>
      </div>
    ))}
    {/* @TODO: Fix naming convention around "final" to "total" */}
    <div className="scoreboard-block final">
      <div className="heading">Total</div>
      <div className="final-score">{score}</div>
    </div>
  </div>
);

export default Scoreboard;
