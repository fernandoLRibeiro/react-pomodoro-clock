import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../ContextProvider";
import "./Timer.css";

const Timer = ({ isPlaying, setIsPlaying, setOpenRingtone }) => {
  const [state, dispatch] = useContext(StateContext);
  // const [time, setTime] = useState(state.taskTime);
  const [timeCount, setTimeCount] = useState(state.taskTime);

  const handleTime = () => {
    if (
      state.playTask ||
      (state.cycleCount !== 0 &&
        state.cyclesBeforeBigBreak !== 0 &&
        state.cycleCount % state.cyclesBeforeBigBreak === 0)
    ) {
      console.log(`setting timer to ${state.taskTime}`);
      setTimeCount(state.taskTime);
    } else {
      console.log(`setting timer to ${state.breakTime}`);
      setTimeCount(state.breakTime);
    }
  };

  useEffect(() => {
    console.log(state.taskTime, state.breakTime);
    // setIsPlaying(false);
    handleTime();
  }, [state.taskTime, state.breakTime, state.playTask]);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        if (timeCount > 0) {
          setTimeCount(timeCount - 1);
        } else {
          setIsPlaying(false);
          dispatch({
            type: "END_TIMER",
          });
          setOpenRingtone(true);
        }
      }, 1000);
    }
  });

  return (
    <div className="timer">
      <h3>
        {Math.floor(timeCount / 3600)
          .toString()
          .padStart(2, "0")}{" "}
        :{" "}
        {Math.floor((timeCount % 3600) / 60)
          .toString()
          .padStart(2, "0")}{" "}
        : {(timeCount % 60).toString().padStart(2, "0")}
      </h3>
    </div>
  );
};

export default Timer;
