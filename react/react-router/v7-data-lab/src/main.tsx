import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// CSS
import "./index.css";

// App
import App from "./App.tsx";

// Layouts
import DefaultLayout from "./layout/DefaultLayout.tsx";
import ProductsLayout from "./layout/ProductsLayout.tsx";

// Not Found
import NotFound from "./pages/NotFound.tsx";

// Corporate
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Report from "./pages/Report.tsx";
import Home from "./pages/Home.tsx";

// Account
import Account from "./pages/Account.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";

// Products
import ViewProduct from "./pages/Products/ViewProduct.tsx";
import EditProduct from "./pages/Products/EditProduct.tsx";
import ListProducts from "./pages/Products/ListProducts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "account",
            element: <Account />,
            children: [
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "report",
            element: <Report />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            element: <ProductsLayout />,
            children: [
              {
                index: true,
                element: <ListProducts />,
              },
              {
                path: ":pid",
                element: <ViewProduct />,
              },
              {
                path: ":pid/edit",
                element: <EditProduct />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
