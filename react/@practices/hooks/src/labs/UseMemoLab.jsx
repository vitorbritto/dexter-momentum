import { useState, useMemo } from "react";

// Simulate a list of products
const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Headphones", price: 200, category: "Electronics" },
  { id: 3, name: "Coffee Maker", price: 80, category: "Home" },
  { id: 4, name: "Desk Chair", price: 150, category: "Office" },
  { id: 5, name: "Notebook", price: 5, category: "Office" },
  { id: 6, name: "Smartphone", price: 900, category: "Electronics" },
  { id: 7, name: "Blender", price: 60, category: "Home" },
];

const UseMemoLab = () => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);

  // useMemo to efficiently filter and calculate total price
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    // Simulate expensive computation
    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        p.price >= minPrice
    );
    return result;
  }, [search, minPrice]);

  const totalPrice = useMemo(() => {
    // Simulate expensive computation
    return filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }, [filteredProducts]);

  return (
    <div
      style={{
        background: "#f9fbe7",
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
          color: "#d32f2f",
          letterSpacing: "0.01em",
        }}
      >
        Product Search (useMemo Example)
      </h3>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "0.5rem",
            width: "60%",
          }}
        />
        <input
          type="number"
          min={0}
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "30%",
          }}
        />
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          marginBottom: "1rem",
        }}
      >
        {filteredProducts.length === 0 ? (
          <li style={{ color: "#888" }}>No products found.</li>
        ) : (
          filteredProducts.map((p) => (
            <li
              key={p.id}
              style={{
                padding: "0.4rem 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#388e3c" }}>
                {p.name}{" "}
                <span style={{ color: "#888", fontSize: "0.95em" }}>
                  ({p.category})
                </span>
              </span>
              <span style={{ fontWeight: "bold", color: "#388e3c" }}>
                ${p.price}
              </span>
            </li>
          ))
        )}
      </ul>
      <div
        style={{
          fontWeight: "bold",
          color: "#1976d2",
          fontSize: "1.1rem",
          textAlign: "right",
        }}
      >
        Total: ${totalPrice}
      </div>
      <p style={{ color: "#888", fontSize: "0.95em", marginTop: "1rem" }}>
        <b>useMemo</b> is used to avoid recalculating the filtered list and
        total price unless the search or min price changes.
      </p>
    </div>
  );
};

export default UseMemoLab;
