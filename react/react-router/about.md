# React Router

React Router is a multi-strategy router for React.  
There are three primary ways, or “modes,” to use it in your app:

- **Declarative**
- **Data**
- **Framework**

The features available in each mode are additive, so moving from Declarative → Data → Framework simply adds more features at the cost of architectural control.

---

## Declarative

Declarative mode enables basic routing features like matching URLs to components, navigating around the app, and providing active states with APIs like `<Link>`, `useNavigate`, and `useLocation`.

```jsx
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## Data

By moving route configuration outside of React rendering, Data Mode adds data loading, actions, pending states, and more with APIs like `loader`, `action`, and `useFetcher`.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    loader: loadRootData,
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
```

---

## Framework

Framework Mode wraps Data Mode with a Vite plugin to add the full React Router experience with:

- type-safe `href`
- type-safe Route Module API
- intelligent code splitting
- SPA, SSR, and static rendering strategies
- and more

```ts
// routes.ts
import { index, route } from "@react-router/dev/routes";

export default [index("./home.tsx"), route("products/:pid", "./product.tsx")];
```

```jsx
// product.jsx
import { Route } from "./+types/product.tsx";

export async function loader({ params }: Route.LoaderArgs) {
  let product = await getProduct(params.pid);
  return { product };
}

export default function Product({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.product.name}</div>;
}
```
