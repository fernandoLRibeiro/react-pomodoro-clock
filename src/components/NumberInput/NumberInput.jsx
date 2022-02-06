import React, { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import "./NumberInput.css";

const NumberInput = ({ counter, setCounter }) => {
  return (
    <div className="number-input">
      <BsFillArrowLeftCircleFill
        size="1.25em"
        onClick={() => {
          if (counter > 0) {
            setCounter(counter - 1);
          }
        }}
        className="arrow-button"
      />
      <div className="number-container">
        <span className="number">{counter}</span>
      </div>
      <BsFillArrowRightCircleFill
        size="1.25em"
        onClick={() => {
          if (counter < 10) {
            setCounter(counter + 1);
          }
        }}
        className="arrow-button"
      />
    </div>
  );
};

export default NumberInput;
