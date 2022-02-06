export const initialState = {
  taskTime: 25 * 60,
  breakTime: 5 * 60,
  cycleCount: 0,
  showCycles: false,
  cyclesBeforeBigBreak: 4,
  playTask: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      console.log("called set settings");
      return {
        ...state,
        taskTime: action.item.taskTime,
        breakTime: action.item.breakTime,
        cyclesBeforeBigBreak: action.item.cyclesBeforeBigBreak,
        showCycles: action.item.showCycles,
        playTask: true,
      };

    case "END_TIMER":
      console.log("called end timer");
      console.log(`setting to ${!state.playTask}`);
      if (state.playTask) {
        return {
          ...state,
          playTask: false,
        };
      } else {
        return {
          ...state,
          playTask: true,
          cycleCount: state.cycleCount + 1,
        };
      }

    default:
      return {
        ...state,
      };
  }
};
