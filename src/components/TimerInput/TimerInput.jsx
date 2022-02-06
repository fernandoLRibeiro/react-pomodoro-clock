import React, { useEffect, useState } from "react";
import "./TimerInput.css";

const TimerInput = ({ setTotal, total }) => {
  const [hours, setHours] = useState(Math.floor(total / 3600));
  const [minutes, setMinutes] = useState(Math.floor((total % 3600) / 60));
  const [seconds, setSeconds] = useState(total % 60);

  useEffect(() => {
    setTotal(hours * 3600 + minutes * 60 + seconds * 1);
  }, [hours, minutes, seconds]);

  return (
    <div className="timer-input">
      <input
        type="tel"
        pattern="\d*"
        maxLength={2}
        placeholder="HH"
        value={hours === 0 ? "00" : hours}
        onChange={(e) => {
          setHours(e.target.value);
        }}
      />
      :
      <input
        type="tel"
        pattern="\d*"
        maxLength={2}
        placeholder="MM"
        value={minutes === 0 ? "00" : minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
        }}
      />
      :
      <input
        type="tel"
        pattern="\d*"
        maxLength={2}
        placeholder="SS"
        value={seconds === 0 ? "00" : seconds}
        onChange={(e) => {
          setSeconds(e.target.value);
        }}
      />
    </div>
  );
};

export default TimerInput;
