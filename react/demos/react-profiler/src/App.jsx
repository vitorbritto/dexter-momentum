import { useState, Profiler } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);

  const onRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log("--------------------------------");
    console.log("Id do componente: ", id);
    console.log("Fase da renderização: ", phase);
    console.log("Duração da renderização: ", actualDuration);
    console.log("Duração base da renderização: ", baseDuration);
    console.log("Tempo de início da renderização: ", startTime);
    console.log("Tempo de commit da renderização: ", commitTime);
    console.log("--------------------------------");

    if (phase === "mount") {
      console.log("Componente montado");
    } else if (phase === "update") {
      console.log("Componente atualizado");
    }
  };

  return (
    <Profiler id="App" onRender={onRender}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Profiler>
  );
};

export default App;
