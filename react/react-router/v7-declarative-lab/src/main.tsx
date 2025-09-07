import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<DefaultLayout />}>
            {/* Home Route */}
            <Route index element={<Home />} />

            {/* Account Routes */}
            <Route path="account" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Corporate Routes */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="report" element={<Report />} />

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Products Routes */}
          <Route path="products">
            {/* Products Layout */}
            <Route element={<ProductsLayout />}>
              <Route index element={<ListProducts />} />
              <Route path=":pid" element={<ViewProduct />} />
              <Route path=":pid/edit" element={<EditProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
