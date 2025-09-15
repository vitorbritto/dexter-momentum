import React from "react";
import { useEcommerceStore } from "../store/ecommerceStore";
import { useShallow } from "zustand/react/shallow";

const FilterControls: React.FC = () => {
  // Only re-renders when filter values change
  const {
    selectedCategory,
    priceRange,
    showInStockOnly,
    setCategory,
    setPriceRange,
    setShowInStockOnly,
  } = useEcommerceStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      priceRange: state.priceRange,
      showInStockOnly: state.showInStockOnly,
      setCategory: state.setCategory,
      setPriceRange: state.setPriceRange,
      setShowInStockOnly: state.setShowInStockOnly,
    }))
  );

  console.log("FilterControls re-rendered");

  return (
    <div
      className="filter-controls"
      style={{
        border: "2px solid #96ceb4",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "8px",
        backgroundColor: "#f0fff4",
      }}
    >
      <h3>Filters</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(e) => setShowInStockOnly(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Show in stock only
        </label>
      </div>

      <div>
        <label>
          Max Price: ${priceRange[1]}
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>
    </div>
  );
};

export default FilterControls;









