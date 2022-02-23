import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../ContextProvider";
import "./Timer.css";

const Timer = ({
  isPlaying,
  setIsPlaying,
  setOpenRingtone,
  handleTime,
  timeLeft,
  setTimeLeft,
  timerEnd,
  time,
}) => {
  const [state, dispatch] = useContext(StateContext);

  useEffect(() => {
    handleTime();
  }, [state.taskTime, state.breakTime, state.playTask]);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        if (timeLeft >= 1000) {
          setTimeLeft(timerEnd - Date.now());
        } else {
          setIsPlaying(false);
          dispatch({
            type: "END_TIMER",
            time: time,
          });
          setOpenRingtone(true);
        }
      }, 200);
    }
  });

  return (
    <div className="timer">
      <h3>
        {Math.floor(timeLeft / 1000 / 3600)
          .toString()
          .padStart(2, "0")}{" "}
        :{" "}
        {Math.floor(((timeLeft / 1000) % 3600) / 60)
          .toString()
          .padStart(2, "0")}{" "}
        :{" "}
        {Math.floor((timeLeft / 1000) % 60)
          .toString()
          .padStart(2, "0")}
      </h3>
    </div>
  );
};

export default Timer;
