import { useEffect, useLayoutEffect, useRef } from "react";
import "./App.css";

function App() {
  const effectRef = useRef();
  const inputElement = useRef(null);

  useEffect(() => {
    console.log("useEffect: Runs after DOM paint");
  });

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect: Runs before DOM paint");
    console.log("Element width: ", effectRef.current.offsetWidth);
  });

  return (
    <>
      <div ref={effectRef}>Hooks</div>

      <input ref={inputElement} type="text" />
    </>
  );
}

export default App;
