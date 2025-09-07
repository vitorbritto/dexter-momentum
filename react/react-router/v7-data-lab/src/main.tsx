import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// CSS
import "./index.css";

// App
const App = lazy(() => import("./App.tsx"));

// Layouts
const DefaultLayout = lazy(() => import("./layout/DefaultLayout.tsx"));
const ProductsLayout = lazy(() => import("./layout/ProductsLayout.tsx"));

// Not Found
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Corporate
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Report = lazy(() => import("./pages/Report.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));

// Account
const Account = lazy(() => import("./pages/Account.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));

// Products
const ViewProduct = lazy(() => import("./pages/Products/ViewProduct.tsx"));
const ListProducts = lazy(() => import("./pages/Products/ListProducts.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Carregando...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<div>Carregando layout...</div>}>
            <DefaultLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div>Carregando página inicial...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "account",
            element: (
              <Suspense fallback={<div>Carregando conta...</div>}>
                <Account />
              </Suspense>
            ),
            children: [
              {
                path: "profile",
                element: (
                  <Suspense fallback={<div>Carregando perfil...</div>}>
                    <Profile />
                  </Suspense>
                ),
              },
              {
                path: "settings",
                element: (
                  <Suspense fallback={<div>Carregando configurações...</div>}>
                    <Settings />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "about",
            element: (
              <Suspense fallback={<div>Carregando sobre...</div>}>
                <About />
              </Suspense>
            ),
          },
          {
            path: "contact",
            element: (
              <Suspense fallback={<div>Carregando contato...</div>}>
                <Contact />
              </Suspense>
            ),
          },
          {
            path: "report",
            element: (
              <Suspense fallback={<div>Carregando relatório...</div>}>
                <Report />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<div>Página não encontrada...</div>}>
                <NotFound />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            element: (
              <Suspense fallback={<div>Carregando produtos...</div>}>
                <ProductsLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense
                    fallback={<div>Carregando lista de produtos...</div>}
                  >
                    <ListProducts />
                  </Suspense>
                ),
                loader: async () => {
                  const response = await fetch(
                    "https://dummyjson.com/products?limit=5"
                  );
                  const products = await response.json();

                  return products;
                },
              },
              {
                path: ":pid",
                element: (
                  <Suspense fallback={<div>Carregando produto...</div>}>
                    <ViewProduct />
                  </Suspense>
                ),
                loader: async ({ params }) => {
                  const { pid } = params;
                  const response = await fetch(
                    `https://dummyjson.com/products/${pid}`
                  );
                  const product = await response.json();
                  console.log("🚀 ~ product:", product);

                  return product;
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Carregando aplicação...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
