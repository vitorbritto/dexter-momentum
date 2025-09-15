import "./App.css";
import UseEffectLab from "./labs/UseEffectLab";
import UseCallbackLab from "./labs/UseCallbackLab";
import UseMemoLab from "./labs/UseMemoLab";
import UseReducerLab from "./labs/UseReducerLab";
import UseIdLab from "./labs/UseIdLab";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "400px",
        margin: "2rem auto",
        background: "#f5f7fa",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#1976d2",
          marginBottom: "0.5rem",
          letterSpacing: "0.02em",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Hooks
      </h1>
      <p
        style={{
          color: "#444",
          fontSize: "1.05rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Hooks are a way to use state and other React features in functional
        components.
      </p>

      <h2
        style={{
          color: "#111",
          fontSize: "1.2rem",
          margin: "1.2rem 0 0.5rem 0",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "0.2rem",
        }}
      >
        UseEffect Lab
      </h2>
      <UseEffectLab />

      <h2
        style={{
          color: "#111",
          fontSize: "1.2rem",
          margin: "1.5rem 0 0.5rem 0",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "0.2rem",
        }}
      >
        UseCallback Lab
      </h2>
      <UseCallbackLab />

      <h2
        style={{
          color: "#111",
          fontSize: "1.2rem",
          margin: "1.5rem 0 0.5rem 0",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "0.2rem",
        }}
      >
        UseMemo Lab
      </h2>
      <UseMemoLab />

      <h2
        style={{
          color: "#111",
          fontSize: "1.2rem",
          margin: "1.5rem 0 0.5rem 0",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "0.2rem",
        }}
      >
        UseReducer Lab
      </h2>
      <UseReducerLab />

      <h2
        style={{
          color: "#111",
          fontSize: "1.2rem",
          margin: "1.5rem 0 0.5rem 0",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "0.2rem",
        }}
      >
        UseId Lab
      </h2>
      <UseIdLab />
    </div>
  );
}

export default App;
