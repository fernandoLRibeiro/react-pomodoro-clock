export const initialState = {
  taskTime: 25 * 60,
  breakTime: 5 * 60,
  cycleCount: 0,
  showCycles: false,
  cyclesBeforeBigBreak: 4,
  playTask: true,
  showTimeSpent: false,
  showDetailed: false,
  timeSpent: 0,
  spentOnTask: 0,
  spentOnBreak: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        ...state,
        taskTime: action.item.taskTime,
        breakTime: action.item.breakTime,
        cyclesBeforeBigBreak: action.item.cyclesBeforeBigBreak,
        showCycles: action.item.showCycles,
        showTimeSpent: action.item.showTimeSpent,
        showDetailed: action.item.showDetailed,
        playTask: true,
      };

    case "END_TIMER":
      if (state.playTask) {
        return {
          ...state,
          playTask: false,
          timeSpent: state.timeSpent + action.time,
          spentOnTask: state.spentOnTask + action.time,
        };
      } else {
        return {
          ...state,
          playTask: true,
          cycleCount: state.cycleCount + 1,
          timeSpent: state.timeSpent + action.time,
          spentOnBreak: state.spentOnBreak + action.time,
        };
      }

    default:
      return {
        ...state,
      };
  }
};
