import "./scoreboard.css";

const RegularRolls = ({ rolls }) => (
  <>
    <div className="roll"></div>
    <div className="roll roll-box">{rolls[0]}</div>
    <div className="roll roll-box">{rolls[1]}</div>
  </>
);

const FinalFrameRolls = ({ rolls }) => (
  <>
    <div className="roll roll-bottom">{rolls[0]}</div>
    <div className="roll roll-box">{rolls[1]}</div>
    <div className="roll roll-box">{rolls[2]}</div>
  </>
);

const FrameDisplay = ({ frame, idx, RollComponent }) => (
  <div className="scoreboard-block frame">
    <div className="heading">{idx + 1}</div>
    <div className="frame-grid">
      <RollComponent rolls={frame.rolls} />
      <div className="frame-score">{frame.score}</div>
    </div>
  </div>
);

const Scoreboard = ({ regularFrames, finalFrame, playerName, score }) => (
  <div className="scoreboard">
    <div className="scoreboard-block player">
      <div className="heading">Name</div>
      <div className="player-name">{playerName}</div>
    </div>
    {regularFrames.map((frame, i) => (
      <FrameDisplay frame={frame} idx={i} RollComponent={RegularRolls} />
    ))}
    <FrameDisplay frame={finalFrame} idx={9} RollComponent={FinalFrameRolls} />
    {/* @TODO: Fix naming convention around "final" to "total" */}
    <div className="scoreboard-block final">
      <div className="heading">Total</div>
      <div className="final-score">{score}</div>
    </div>
  </div>
);

export default Scoreboard;
