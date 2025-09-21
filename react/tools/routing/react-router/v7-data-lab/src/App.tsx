import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header>
        <h1>React Router v7 - Data Lab</h1>
      </header>

      <nav
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          margin: "1rem 0",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          🏠 Home
        </Link>
        <Link
          to="/about"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          ℹ️ About
        </Link>
        <Link
          to="/contact"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          📞 Contact
        </Link>
        <Link
          to="/products"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          🛍️ Products
        </Link>
        <Link
          to="/report"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          📊 Report
        </Link>
        <Link
          to="/account"
          style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}
        >
          📱 Account
        </Link>
      </nav>

      <main style={{ minWidth: "100%", padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
