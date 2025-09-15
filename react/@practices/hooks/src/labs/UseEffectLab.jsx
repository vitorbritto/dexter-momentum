import { useEffect, useLayoutEffect, useRef } from "react";

const UseEffectLab = () => {
  // Ref for the div element to measure its width
  const effectRef = useRef(null);

  // Ref for the input element to focus it
  const inputElement = useRef(null);

  // useEffect runs after the DOM has painted
  useEffect(() => {
    console.log("useEffect: Runs after DOM paint");
  });

  // Focus the input only once after the initial render
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  // useLayoutEffect runs synchronously before the DOM is painted
  useLayoutEffect(() => {
    if (effectRef.current) {
      console.log("useLayoutEffect: Runs before DOM paint");
      console.log("Element width: ", effectRef.current.offsetWidth);
    }
  });

  return (
    <div
      style={{
        background: "#f0f4fa",
        borderRadius: "8px",
        padding: "1.2rem",
        margin: "1rem 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      {/* This div's width is measured in useLayoutEffect */}
      <div
        ref={effectRef}
        style={{
          background: "#1976d2",
          color: "#fff",
          padding: "0.6rem 1.2rem",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "1.05rem",
          letterSpacing: "0.01em",
          boxShadow: "0 1px 4px rgba(25, 118, 210, 0.08)",
        }}
      >
        Effect Ref
      </div>

      {/* This input is focused on mount */}
      <input
        ref={inputElement}
        type="text"
        placeholder="Auto-focused input"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "1px solid #bdbdbd",
          fontSize: "1rem",
          outline: "none",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          transition: "border 0.2s",
        }}
      />
    </div>
  );
};

export default UseEffectLab;
