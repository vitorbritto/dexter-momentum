import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div
      style={{
        padding: "1rem",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        backgroundColor: "#1d1d1d",
        borderRadius: "8px",
        margin: "1rem 0",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Default Layout
      </h1>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
