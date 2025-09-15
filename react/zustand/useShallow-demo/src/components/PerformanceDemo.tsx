import React from "react";
import { useEcommerceStore } from "../store/ecommerceStore";
import { useShallow } from "zustand/react/shallow";
import ProductCardWithoutShallow from "./ProductCardWithoutShallow";
import ProductCardWithShallow from "./ProductCardWithShallow";
import CartSummary from "./CartSummary";
import FilterControls from "./FilterControls";

const PerformanceDemo: React.FC = () => {
  const { products, filteredProducts } = useEcommerceStore(
    useShallow((state) => ({
      products: state.products,
      filteredProducts: state.getFilteredProducts(),
    }))
  );

  const [showFiltered, setShowFiltered] = React.useState(false);
  const [renderCount, setRenderCount] = React.useState(0);

  // Force re-render to demonstrate the difference
  const forceReRender = () => {
    setRenderCount((prev) => prev + 1);
  };

  console.log("PerformanceDemo re-rendered");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
        useShallow Performance Demo
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#ff6b6b" }}>❌ Without useShallow</h2>
          <p style={{ color: "#666" }}>
            These components re-render on EVERY store update
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#4ecdc4" }}>✅ With useShallow</h2>
          <p style={{ color: "#666" }}>
            These components only re-render when their data changes
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h3 style={{ color: "#ff6b6b" }}>Without useShallow (Red Border)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {products.map((product) => (
              <ProductCardWithoutShallow
                key={product.id}
                productId={product.id}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: "#4ecdc4" }}>With useShallow (Green Border)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {products.map((product) => (
              <ProductCardWithShallow key={product.id} productId={product.id} />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h3>Filtered Products (With useShallow)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCardWithShallow key={product.id} productId={product.id} />
            ))}
          </div>
        </div>

        <div>
          <h3>Controls & Cart</h3>
          <FilterControls />
          <CartSummary />

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "2px solid #f39c12",
              borderRadius: "8px",
              backgroundColor: "#fff8e1",
            }}
          >
            <h4>Performance Test</h4>
            <p>Render Count: {renderCount}</p>
            <button
              onClick={forceReRender}
              style={{
                backgroundColor: "#f39c12",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Force Re-render (Check Console)
            </button>
            <p
              style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}
            >
              Click this button to see which components re-render in the
              console.
              <br />
              Notice how only the components with useShallow avoid unnecessary
              re-renders!
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3>How to Test:</h3>
        <ol>
          <li>Open your browser's console to see re-render logs</li>
          <li>Add/remove items from the cart using the product cards</li>
          <li>Change filters using the filter controls</li>
          <li>Click "Force Re-render" to see the difference</li>
          <li>
            Notice that components WITHOUT useShallow re-render on every store
            change
          </li>
          <li>
            Components WITH useShallow only re-render when their specific data
            changes
          </li>
        </ol>

        <h4>Key Benefits of useShallow:</h4>
        <ul>
          <li>
            <strong>Performance:</strong> Prevents unnecessary re-renders
          </li>
          <li>
            <strong>Scalability:</strong> Performance remains consistent as your
            app grows
          </li>
          <li>
            <strong>Efficiency:</strong> Only re-renders when actual data
            changes
          </li>
          <li>
            <strong>Debugging:</strong> Easier to track which components are
            re-rendering and why
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceDemo;









