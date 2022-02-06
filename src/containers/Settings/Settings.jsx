import React, { useContext, useEffect, useState } from "react";
import NumberInput from "../../components/NumberInput/NumberInput";
import TimerInput from "../../components/TimerInput/TimerInput";
import { StateContext } from "../../ContextProvider";
import "./Settings.css";

const Settings = () => {
  const [state, dispatch] = useContext(StateContext);
  const [taskTotal, setTaskTotal] = useState(state.taskTime);
  const [breakTotal, setBreakTotal] = useState(state.breakTime);
  const [counter, setCounter] = useState(state.cyclesBeforeBigBreak);
  const [showCycles, setShowCycles] = useState(state.showCycles);

  const handleSet = () => {
    dispatch({
      type: "SET_SETTINGS",
      item: {
        taskTime: taskTotal,
        breakTime: breakTotal,
        cyclesBeforeBigBreak: counter,
        showCycles: showCycles,
      },
    });
  };

  return (
    <div className="settings-container">
      <div className="inputs-container">
        <div className="timer-forms-container">
          <label className="cluster" for="task-time">
            <span className="label-text">Task Time</span>
            <TimerInput
              id="task-time"
              setTotal={setTaskTotal}
              total={taskTotal}
            />
          </label>
          <label className="cluster" for="break-time">
            <span className="label-text">Break Time</span>

            <TimerInput
              id="break-time"
              setTotal={setBreakTotal}
              total={breakTotal}
            />
          </label>
        </div>
        <div className="other-inputs-container">
          <label className="cluster" for="big-break">
            <span className="label-text">Take a Big Break Every x Cycles</span>
            <NumberInput
              id="big-break"
              counter={counter}
              setCounter={setCounter}
            />
          </label>
          <label className="cluster checkbox" for="checkboxId">
            <span className="label-text">Show Cycle Counter</span>
            <input
              type="checkbox"
              className="checkbox-input"
              id="checkboxId"
              checked={showCycles}
              onChange={(e) => setShowCycles(e.target.checked)}
            />
            <div className="checkbox-box" />
          </label>
        </div>
      </div>
      <div className="button-container">
        <button className="set-button" onClick={handleSet}>
          SET
        </button>
      </div>
    </div>
  );
};

export default Settings;