import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const initialProduct = pid
    ? {
        id: pid,
        name: `Product ${pid}`,
        description: `Product ${pid} description`,
        price: (Number(pid) * 10).toFixed(2),
        stock: Number(pid) * 5,
        category: `Category ${pid}`,
        brand: `Brand ${pid}`,
      }
    : null;

  const [product, setProduct] = useState(initialProduct);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) =>
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
    // Aqui você pode adicionar lógica para salvar as alterações
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
            value={product.name}
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
            value={product.description}
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
            value={product.price}
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
            value={product.stock}
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
            value={product.category}
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

export default EditProduct;
