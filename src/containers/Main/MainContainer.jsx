import React, { useContext, useState } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openRingtone, setOpenRingtone] = useState(false);

  return (
    <div className="main-container">
      <h2 className="heading">{state.playTask ? "Task" : (state.cycleCount !== 0 &&
        state.cyclesBeforeBigBreak !== 0 &&
        state.cycleCount % state.cyclesBeforeBigBreak === 0) ? "Big Break" : "Break"}</h2>
      <div className="timer-container">
        <Timer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setOpenRingtone={setOpenRingtone}
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
            <AiFillPlayCircle size="3em" onClick={() => setIsPlaying(true)} />
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
      {openSettings ? <Settings setIsPlaying={setIsPlaying} /> : null}
    </div>
  );
};

export default MainContainer;
