import "./App.css";
import MainContainer from "./containers/Main/MainContainer";
import { ContextProvider } from "./ContextProvider";
import { reducer } from "./reducer";

function App() {
  return (
    <ContextProvider reducer={reducer}>
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <MainContainer />
      </div>
    </ContextProvider>
  );
}

export default App;
