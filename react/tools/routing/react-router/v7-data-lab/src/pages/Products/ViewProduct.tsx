import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const ViewProduct = () => {
  const navigate = useNavigate();
  const product = useLoaderData();
  const [productData, setProductData] = useState(product);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "stock"
                ? Number(value)
                : name === "price"
                ? value
                : value,
          }
        : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Produto salvo! (simulação)");
    navigate("/products");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        background: "#222",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        🛍️ Edit Product Details
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Nome do Produto
          <input
            type="text"
            name="name"
            value={productData.title}
            onChange={handleChange}
            placeholder="Product Name"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Descrição
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Preço
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Product Price"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            min={0}
            step="0.01"
            required
          />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Estoque
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Product Stock"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            min={0}
            required
          />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Categoria
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Product Category"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", fontWeight: 500 }}
        >
          Marca
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Product Brand"
            style={{
              marginTop: 4,
              padding: "0.5rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: 6,
            border: "none",
            background: "#007bff",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Salvar
        </button>
      </form>

      <br />

      <button onClick={() => navigate("/products")}>
        Voltar para Produtos
      </button>
    </div>
  );
};

export default ViewProduct;
