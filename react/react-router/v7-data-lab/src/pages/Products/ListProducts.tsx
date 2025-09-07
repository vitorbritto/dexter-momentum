import { Link, useLoaderData } from "react-router";

const ListProducts = () => {
  const { products } = useLoaderData();

  return (
    <div>
      <h2>🛍️ List Products</h2>

      {products.map((product) => (
        <div>
          <h2>{product.title}</h2>
          <Link to={`/products/${product.id}`}>View Product</Link>
        </div>
      ))}
    </div>
  );
};

export default ListProducts;
