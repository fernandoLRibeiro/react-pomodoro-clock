import React, { useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import NumberInput from "../../components/NumberInput/NumberInput";
import TimerInput from "../../components/TimerInput/TimerInput";
import { StateContext } from "../../ContextProvider";
import "./Settings.css";

const Settings = ({ setIsPlaying, setOpenSettings }) => {
  const [state, dispatch] = useContext(StateContext);
  const [taskTotal, setTaskTotal] = useState(state.taskTime);
  const [breakTotal, setBreakTotal] = useState(state.breakTime);
  const [counter, setCounter] = useState(state.cyclesBeforeBigBreak);
  const [showCycles, setShowCycles] = useState(state.showCycles);
  const [showTimeSpent, setShowTimeSpent] = useState(state.showTimeSpent);
  const [showDetailed, setShowDetailed] = useState(state.showDetailed);

  const handleSet = () => {
    dispatch({
      type: "SET_SETTINGS",
      item: {
        taskTime: taskTotal,
        breakTime: breakTotal,
        cyclesBeforeBigBreak: counter,
        showCycles: showCycles,
        showTimeSpent: showTimeSpent,
        showDetailed: showDetailed,
      },
    });
    setOpenSettings(false);
  };

  const handleTimeSpent = (checked) => {
    if (!checked) {
      setShowTimeSpent(false);
      setShowDetailed(false);
    } else {
      setShowTimeSpent(checked);
    }
  };

  const handleDetailed = (checked) => {
    if (checked) {
      setShowTimeSpent(true);
      setShowDetailed(true);
    } else {
      setShowDetailed(checked);
    }
  };

  return (
    <form className="settings-container">
      <div className="timer-form-container">
        <label className="cluster" htmlFor="task-time">
          <span className="label-text">Task length</span>
          <TimerInput
            id="task-time"
            setTotal={setTaskTotal}
            total={taskTotal}
          />
        </label>
        <label className="cluster" htmlFor="break-time">
          <span className="label-text">Break length</span>

          <TimerInput
            id="break-time"
            setTotal={setBreakTotal}
            total={breakTotal}
          />
        </label>

        <label className="cluster" htmlFor="big-break">
          <span
            className="label-text"
            data-tip="A long break is a break as long as a task. Set to 0 to not take any long breaks."
            data-for="big-break-helper"
          >
            Long break interval
          </span>
          <ReactTooltip
            id="big-break-helper"
            place="top"
            effect="solid"
            border
            textColor="#008f11"
            backgroundColor="#2c071b"
            borderColor="#003b00"
          />
          <NumberInput
            id="big-break"
            counter={counter}
            setCounter={setCounter}
          />
        </label>
        <label className="cluster checkbox" htmlFor="cycle-checkbox">
          <span className="label-text">Show cycle counter</span>
          <input
            type="checkbox"
            className="checkbox-input"
            id="cycle-checkbox"
            checked={showCycles}
            onChange={(e) => setShowCycles(e.target.checked)}
          />
          <div className="checkbox-box" />
        </label>
        <label className="cluster checkbox" htmlFor="time-spent-checkbox">
          <span className="label-text">Show time spent</span>
          <input
            type="checkbox"
            className="checkbox-input"
            id="time-spent-checkbox"
            checked={showTimeSpent}
            onChange={(e) => {
              handleTimeSpent(e.target.checked);
            }}
          />
          <div className="checkbox-box" />
        </label>
        <label className="cluster checkbox" htmlFor="detailed-checkbox">
          <span className="label-text">Show detailed time spent</span>
          <input
            type="checkbox"
            className="checkbox-input"
            id="detailed-checkbox"
            checked={showDetailed}
            onChange={(e) => {
              handleDetailed(e.target.checked);
            }}
          />
          <div className="checkbox-box" />
        </label>
      </div>

      <div className="buttons-container">
        <button
          className="set-button"
          onClick={(e) => {
            e.preventDefault();
            setIsPlaying(false);
            handleSet();
          }}
        >
          Set
        </button>
      </div>
    </form>
  );
};

export default Settings;
