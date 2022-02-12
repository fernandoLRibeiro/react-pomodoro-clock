import React, { useContext, useState, useEffect } from "react";
import Timer from "../../components/Timer/Timer";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import "./MainContainer.css";
import Settings from "../Settings/Settings";
import mgscodecringtone from "../../assets/audio/mgscodecringtone.mp3";
import { StateContext } from "../../ContextProvider";

const MainContainer = () => {
  const [state, dispatch] = useContext(StateContext);
  const [timerStart, setTimerStart] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openRingtone, setOpenRingtone] = useState(false);
  const [time, setTime] = useState(state.taskTime * 1000);
  const [timerEnd, setTimerEnd] = useState(timerStart + time);
  const [timeLeft, setTimeLeft] = useState(timerEnd - timerStart);

  const handleTime = () => {
    if (
      state.playTask ||
      (state.cycleCount !== 0 &&
        state.cyclesBeforeBigBreak !== 0 &&
        state.cycleCount % state.cyclesBeforeBigBreak === 0)
    ) {
      setTime(state.taskTime * 1000);
      setTimeLeft(time);
    } else {
      setTime(state.breakTime * 1000);
    }
  };

  useEffect(() => {
    setTimeLeft(time);
    setTimerStart(Date.now());
  }, [time]);

  return (
    <div className="main-container">
      <h2 className="heading">
        {state.playTask
          ? "Task"
          : state.cycleCount !== 0 &&
            state.cyclesBeforeBigBreak !== 0 &&
            state.cycleCount % state.cyclesBeforeBigBreak === 0
          ? "Big Break"
          : "Break"}
      </h2>
      <div className="timer-container">
        <Timer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setOpenRingtone={setOpenRingtone}
          timerStart={timerStart}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          timerEnd={timerEnd}
          handleTime={handleTime}
        />
      </div>
      {state.showCycles ? (
        <div className="cycle-count-container">
          <h3>{`Number of cycles: ${state.cycleCount}`}</h3>
        </div>
      ) : null}

      {openRingtone ? (
        <div className="ringtone-container">
          <audio autoPlay loop src={mgscodecringtone} />
          <div className="controller-icon">
            <AiFillCloseCircle
              onClick={() => {
                setOpenRingtone(false);
              }}
              size="3em"
            />
          </div>
        </div>
      ) : null}
      <div className="controllers-container">
        <div className="controller-icon">
          {isPlaying ? (
            <AiFillPauseCircle size="3em" onClick={() => setIsPlaying(false)} />
          ) : (
            <AiFillPlayCircle
              size="3em"
              onClick={() => {
                setIsPlaying(true);
                setTimerStart(Date.now());
                // setTimeLeft(time);
                setTimerEnd(Date.now() + timeLeft);
              }}
            />
          )}
        </div>

        <div className="controller-icon">
          <MdSettings
            size="3em"
            onClick={() => {
              setOpenSettings(!openSettings);
            }}
          />
        </div>
      </div>
      {openSettings ? (
        <Settings
          setIsPlaying={setIsPlaying}
          setOpenSettings={setOpenSettings}
        />
      ) : null}
    </div>
  );
};

export default MainContainer;
