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
      setTimeLeft(time);
    }
  };

  useEffect(() => {
    setTimeLeft(time);
    setTimerStart(Date.now());
  }, [time]);

  useEffect(() => {
    if (isPlaying) {
      if (state.playTask) {
        document.title = "Task";
      } else if (
        state.cycleCount !== 0 &&
        state.cyclesBeforeBigBreak !== 0 &&
        state.cycleCount % state.cyclesBeforeBigBreak === 0
      ) {
        document.title = "Long Break";
      } else {
        document.title = "Break";
      }
    } else {
      if (openRingtone) {
        document.title = "HEY!";
      } else {
        document.title = "Pomodoro Clock";
      }
    }
  }, [state.playTask, isPlaying, openRingtone]);

  return (
    <div className="main-container">
      <h2 className="heading">
        {state.playTask
          ? "Task"
          : state.cycleCount !== 0 &&
            state.cyclesBeforeBigBreak !== 0 &&
            state.cycleCount % state.cyclesBeforeBigBreak === 0
          ? "Long Break"
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
          time={time}
        />
      </div>

      <div className="optionals">
        {state.showCycles && (
          <div className="cycle-count-container">
            <h3>{`Number of cycles: ${state.cycleCount}`}</h3>
          </div>
        )}

        {state.showTimeSpent ? (
          state.showDetailed ? (
            <div className="detailed-time-spent-container">
              <table>
                <tr>
                  <th>Task</th>
                  <td>
                    {`
                  ${Math.floor(state.spentOnTask / 1000 / 3600)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                      ((state.spentOnTask / 1000) % 3600) / 60
                    )
                      .toString()
                      .padStart(2, "0")}:${Math.floor(
                      (state.spentOnTask / 1000) % 60
                    )
                      .toString()
                      .padStart(2, "0")}
                `}
                  </td>
                </tr>

                <tr>
                  <th>Break</th>
                  <td>
                    {`
                  ${Math.floor(state.spentOnBreak / 1000 / 3600)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                      ((state.spentOnBreak / 1000) % 3600) / 60
                    )
                      .toString()
                      .padStart(2, "0")}:${Math.floor(
                      (state.spentOnBreak / 1000) % 60
                    )
                      .toString()
                      .padStart(2, "0")}
                `}
                  </td>
                </tr>

                <tr>
                  <th>Total</th>
                  <td>
                    {`
                  ${Math.floor(state.timeSpent / 1000 / 3600)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                      ((state.timeSpent / 1000) % 3600) / 60
                    )
                      .toString()
                      .padStart(2, "0")}:${Math.floor(
                      (state.timeSpent / 1000) % 60
                    )
                      .toString()
                      .padStart(2, "0")}
                `}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <div className="time-spent-container">
              <h3>Total Time spent: </h3>
              <p>
                &nbsp;
                {`
                  ${Math.floor(state.timeSpent / 1000 / 3600)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                  ((state.timeSpent / 1000) % 3600) / 60
                )
                  .toString()
                  .padStart(2, "0")}:${Math.floor((state.timeSpent / 1000) % 60)
                  .toString()
                  .padStart(2, "0")}
                `}
              </p>
            </div>
          )
        ) : null}
      </div>

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
