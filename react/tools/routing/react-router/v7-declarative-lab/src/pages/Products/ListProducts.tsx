import { Link } from "react-router";

const ListProducts = () => {
  return (
    <div>
      <h2>🛍️ List Products</h2>

      <ul>
        <li>
          <Link to="/products/1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/3">Product 3</Link>
        </li>
        <li>
          <Link to="/products/4">Product 4</Link>
        </li>
        <li>
          <Link to="/products/5">Product 5</Link>
        </li>
        <li>
          <Link to="/products/6">Product 6</Link>
        </li>
        <li>
          <Link to="/products/7">Product 7</Link>
        </li>
        <li>
          <Link to="/products/8">Product 8</Link>
        </li>
        <li>
          <Link to="/products/9">Product 9</Link>
        </li>
        <li>
          <Link to="/products/10">Product 10</Link>
        </li>
      </ul>
    </div>
  );
};

export default ListProducts;
