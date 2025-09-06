import React from "react";
import { useEcommerceStore } from "../store/ecommerceStore";
import { useShallow } from "zustand/react/shallow";

interface ProductCardWithShallowProps {
  productId: string;
}

const ProductCardWithShallow: React.FC<ProductCardWithShallowProps> = ({
  productId,
}) => {
  // ✅ WITH useShallow - This prevents re-renders when the selected data hasn't changed
  const { product, cartItem, addToCart, removeFromCart } = useEcommerceStore(
    useShallow((state) => ({
      product: state.products.find((p) => p.id === productId),
      cartItem: state.cartItems.find((item) => item.productId === productId),
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
    }))
  );

  // Now this component only re-renders when:
  // - The specific product data changes
  // - The specific cart item changes
  // - NOT when other products or cart items change

  console.log(`ProductCardWithShallow ${productId} re-rendered`);

  return (
    <div
      className="product-card"
      style={{
        border: "2px solid #4ecdc4",
        padding: "1rem",
        margin: "0.5rem",
        borderRadius: "8px",
        backgroundColor: "#f0f9ff",
      }}
    >
      <h3>{product?.name}</h3>
      <p>Price: ${product?.price}</p>
      <p>Category: {product?.category}</p>
      <p>In Stock: {product?.inStock ? "Yes" : "No"}</p>
      <p>In Cart: {cartItem?.quantity || 0}</p>

      <button
        onClick={() => addToCart(productId)}
        style={{
          backgroundColor: "#4ecdc4",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          marginRight: "0.5rem",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>

      {cartItem && (
        <button
          onClick={() => removeFromCart(productId)}
          style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ProductCardWithShallow;

