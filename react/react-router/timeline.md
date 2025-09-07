# 📜 The History of React Router (from v3 onward)

## 🔹 React Router v3 (2016)

- **Context:** Up through version 3, React Router was based on a classic declarative approach, heavily dependent on nested components.
- **Key characteristics:**
  - Routes were defined as a tree, usually in a single file.
  - Use of `browserHistory` and `hashHistory`.
  - Support for nested routes via `<Route>` and `<IndexRoute>`.
  - Lifecycle hooks `onEnter` / `onLeave`.
- **Problem:** Centralized configuration made async/dynamic routing harder.

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./App";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>,
  document.getElementById("root")
);

// App.jsx
import React from "react";

const App = ({ children }) => (
  <div>
    <h1>My Site</h1>
    <nav>
      <a href="/">Home</a> | <a href="/about">About</a> |{" "}
      <a href="/contact">Contact</a>
    </nav>
    <hr />
    {children}
  </div>
);

export default App;
```

## 🔹 React Router v4 (2017)

- **Revolution:** Complete rewrite.
- **Paradigm shift:** Routes became React components.

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// App.js
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

const App = () => (
  <div>
    <h1>My Site</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>
    <hr />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </div>
);

export default App;
```

## 🔹 React Router v5 (2019)

- **Goal:** Smooth transition from v4.
- **Improvements:**
  - Better integration with `React.memo` and `React.lazy`.
  - `<Switch>` optimized.
  - Enhanced React 16 support.
  - Minor API refinements.

## 🔹 React Router v6 (2021)

- **Major rewrite:** Simplified API + performance.

**Key changes:**

- `<Switch>` → `<Routes>`
- `component` → `element`
- Data APIs (v6.4+) with `loader`, `action`, `errorElement`

```jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

const App = () => (
  <div>
    <h1>My Site</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>
    <hr />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </div>
);

export default App;
```

## 🔹 React Router v7 (2024–2025)

### New Features

- **Framework mode** (SSR, file-based routing, HMR, Vite integration).
- **Unified package** → only `react-router`.
- **Improved Data APIs** with typegen.
- **Per-route errors** via `errorElement`.
- **Suspense + streaming** with React 18/19.
- **Non-breaking migration** from v6.
- **Stable release:** Nov 2024 → latest v7.5.0 (Apr 2025).

```jsx
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createStaticRouter,
  RouterProvider,
} from "react-router";
import App from "./App";

// SPA
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// SSR
const router = createStaticRouter(routes);
const html = renderToString(<RouterProvider router={router} />);
```

```jsx
import { Outlet, useLoaderData } from "react-router";

export async function loader({ params }) {
  const res = await fetch(`/api/user/${params.id}`);
  return new Response(JSON.stringify(await res.json()), {
    headers: { "Content-Type": "application/json" },
  });
}

function UserPage() {
  const data = useLoaderData();
  return <div>User: {data.name}</div>;
}

function ErrorBoundary() {
  const error = useRouteError();
  return <div>Error: {error.message}</div>;
}

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const routes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user/:id",
        element: <UserPage />,
        loader,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
];
```

# 📝 Evolution Summary

- **v3:** Centralized config, rigid nested routes.
- **v4:** Revolution, routes as components.
- **v5:** Refinement of v4, stability.
- **v6:** Simplified API, `<Routes>`, Data APIs.
- **v7:** Framework mode, SSR, file-based routing, typegen.

👉 React Router evolved from a **classic configurable router (v3)** → **declarative & flexible (v4/v5)** → **modern navigation + data APIs (v6)** → **foundation for full-stack apps (v7)**.
