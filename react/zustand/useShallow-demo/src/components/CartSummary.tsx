import React from "react";
import { useEcommerceStore } from "../store/ecommerceStore";
import { useShallow } from "zustand/react/shallow";

const CartSummary: React.FC = () => {
  // Only re-renders when cart total or item count changes
  const { total, itemCount } = useEcommerceStore(
    useShallow((state) => ({
      total: state.getCartTotal(),
      itemCount: state.getCartItemCount(),
    }))
  );

  console.log("CartSummary re-rendered");

  return (
    <div
      className="cart-summary"
      style={{
        border: "2px solid #45b7d1",
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "8px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h3>Shopping Cart</h3>
      <p>Items: {itemCount}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;










