import { useNavigate, useParams } from "react-router";

const ViewProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  // Simulando busca de detalhes do produto com base no ID da URL
  // Aqui, você pode substituir por uma chamada de API real se necessário
  const product = pid
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

  const handleEdit = () => {
    if (pid) {
      navigate(`/products/${pid}/edit`);
    }
  };

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div>
      <section>
        <h2>🛍️ Detalhes do Produto</h2>
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Nome:</strong> {product.name}
        </p>
        <p>
          <strong>Descrição:</strong> {product.description}
        </p>
        <p>
          <strong>Preço:</strong> R$ {product.price}
        </p>
        <p>
          <strong>Estoque:</strong> {product.stock}
        </p>
        <p>
          <strong>Categoria:</strong> {product.category}
        </p>
        <p>
          <strong>Marca:</strong> {product.brand}
        </p>
      </section>

      <button onClick={() => navigate("/products")}>
        Voltar para Produtos
      </button>
      <button onClick={handleEdit}>Editar Produto</button>
    </div>
  );
};

export default ViewProduct;
