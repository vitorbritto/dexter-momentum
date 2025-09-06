import React from "react";
import { useEcommerceStore } from "../store/ecommerceStore";

interface ProductCardWithoutShallowProps {
  productId: string;
}

const ProductCardWithoutShallow: React.FC<ProductCardWithoutShallowProps> = ({
  productId,
}) => {
  // ❌ WITHOUT useShallow - This creates NEW objects every time the store updates
  const product = useEcommerceStore((state) =>
    state.products.find((p) => p.id === productId)
  );

  const cartItem = useEcommerceStore((state) =>
    state.cartItems.find((item) => item.productId === productId)
  );

  const addToCart = useEcommerceStore((state) => state.addToCart);
  const removeFromCart = useEcommerceStore((state) => state.removeFromCart);

  // This component will re-render on EVERY store update, even if
  // the product or cartItem data hasn't changed!

  console.log(`ProductCardWithoutShallow ${productId} re-rendered`);

  return (
    <div
      className="product-card"
      style={{
        border: "2px solid #ff6b6b",
        padding: "1rem",
        margin: "0.5rem",
        borderRadius: "8px",
        backgroundColor: "#fff5f5",
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

export default ProductCardWithoutShallow;

