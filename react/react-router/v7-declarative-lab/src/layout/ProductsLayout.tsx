import { Outlet } from "react-router";

const ProductsLayout = () => {
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
        backgroundColor: "#292929",
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
        Product Layout
      </h1>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
