import { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const UseReducerLab = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p style={{ marginBottom: "1rem", color: "#444" }}>
        Count: {state.count}
      </p>
      <button
        onClick={() => dispatch({ type: "increment" })}
        style={{ marginRight: "1rem" }}
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        style={{ marginRight: "1rem" }}
      >
        Decrement
      </button>
    </div>
  );
};

export default UseReducerLab;
