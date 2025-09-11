import { memo, useState, useCallback } from "react";

// Simulate a list of users
const initialUsers = [
  { id: 1, name: "Alice", isActive: false },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: false },
];

// Child component that only re-renders if its props change
const UserList = memo(({ users, onToggleActive }) => {
  console.log("UserList rendered");
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        background: "#fafbfc",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {users.map((user) => (
        <li
          key={user.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid #ececec",
            background: user.isActive ? "#e6ffe6" : "transparent",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              fontWeight: user.isActive ? "bold" : "normal",
              color: user.isActive ? "#219653" : "#222",
              fontSize: "1rem",
              letterSpacing: "0.01em",
            }}
          >
            {user.name}
          </span>
          <button
            onClick={() => onToggleActive(user.id)}
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "4px",
              border: "none",
              background: user.isActive ? "#f44336" : "#2196f3",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.95rem",
              transition: "background 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </button>
        </li>
      ))}
    </ul>
  );
});

const UseCallbackLab = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  // useCallback ensures the function reference is stable unless 'users' changes
  const handleToggleActive = useCallback(
    (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
    },
    [] // No dependencies: safe here because setUsers callback uses previous state
  );

  // This function is NOT memoized, so changing search will always re-render this input,
  // but UserList will not re-render unless users or handleToggleActive changes.
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter users by search term (case-insensitive)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        padding: "2rem 1.5rem",
        margin: "1.5rem 0",
        maxWidth: "350px",
        width: "100%",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "1rem",
          fontSize: "1.3rem",
          color: "#1976d2",
          letterSpacing: "0.01em",
        }}
      >
        User List
      </h3>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: "1.2rem",
          padding: "0.5rem 0.8rem",
          borderRadius: "5px",
          border: "1px solid #bdbdbd",
          width: "100%",
          fontSize: "1rem",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      <UserList users={filteredUsers} onToggleActive={handleToggleActive} />
      <p
        style={{
          marginTop: "1.2rem",
          fontSize: "0.95rem",
          color: "#666",
        }}
      >
        <em>
          Try searching for a user or toggling their active status. The user
          list only re-renders when the user data changes, not when you type in
          the search box.
        </em>
      </p>
    </div>
  );
};

export default UseCallbackLab;
