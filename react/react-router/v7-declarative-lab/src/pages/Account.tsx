import { Link, Outlet } from "react-router";

const Account = () => {
  return (
    <div>
      <h2>📱 Account</h2>
      <p>Account page.</p>
      <ul
        style={{
          listStyle: "none",
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem auto",
          gap: "1rem",
        }}
      >
        <li>
          <Link
            to="/account/profile"
            style={{
              textDecoration: "none",
              color: "cyan",
              fontWeight: "bold",
            }}
          >
            Profile
          </Link>
        </li>
        <br />
        <li>
          <Link
            to="/account/settings"
            style={{
              textDecoration: "none",
              color: "cyan",
              fontWeight: "bold",
            }}
          >
            Settings
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Account;
