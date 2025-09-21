import { useId } from "react";

const UseIdLab = () => {
  const id = useId();

  return (
    <div>
      <p style={{ marginBottom: "1rem", color: "#444" }}>ID: {id}</p>
    </div>
  );
};

export default UseIdLab;
