# TODO

- [x] Configure Routes
- [x] Implement Nested Routes
- [x] Implement the Layout Routes
- [x] Implement the Index Routes
- [x] Implement the Route Prefixes
- [x] Implement the Dynamic Segments
- [x] Implement the Optional Segments
- [x] Implement the Splats
- [x] Implement the Linking

## Layout Routes

Routes without a path create new nesting for their children, but they don't add any segments to the URL.

```jsx
<Routes>
  <Route element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  <Route path="projects">
    <Route index element={<ProjectsHome />} />
    <Route element={<ProjectsLayout />}>
      <Route path=":pid" element={<Project />} />
      <Route path=":pid/edit" element={<EditProject />} />
    </Route>
  </Route>
</Routes>
```

## Index Routes

Index routes render into their parent's <Outlet/> at their parent's URL (like a default child route). They are configured with the index prop:

```jsx
<Routes>
  <Route path="/" element={<Root />}>
    {/* renders into the outlet in <Root> at "/" */}
    <Route index element={<Home />} />

    <Route path="dashboard" element={<Dashboard />}>
      {/* renders into the outlet in <Dashboard> at "/dashboard" */}
      <Route index element={<DashboardHome />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>
```

Note that index routes can't have children. If you're expecting that behavior, you probably want a layout route.

## Route Prefixes

A <Route path> without an element prop adds a path prefix to its child routes, without introducing a parent layout.

```jsx
<Route path="projects">
  <Route index element={<ProjectsHome />} />
  <Route element={<ProjectsLayout />}>
    <Route path=":pid" element={<Project />} />
    <Route path=":pid/edit" element={<EditProject />} />
  </Route>
</Route>
```

## Dynamic Segments

If a path segment starts with : then it becomes a "dynamic segment". When the route matches the URL, the dynamic segment will be parsed from the URL and provided as params to other router APIs like useParams.

```jsx
<Route path="teams/:teamId" element={<Team />} />
Copy code to clipboard
import { useParams } from "react-router";

export default function Team() {
  let params = useParams();
  // params.teamId
}
```

You can have multiple dynamic segments in one route path:

```jsx
<Route path="/c/:categoryId/p/:productId" element={<Product />} />
```

```jsx
import { useParams } from "react-router";

export default function CategoryProduct() {
  let { categoryId, productId } = useParams();
  // ...
}
```

You should ensure that all dynamic segments in a given path are unique. Otherwise, as the params object is populated - latter dynamic segment values will override earlier values.

## Optional Segments

You can make a route segment optional by adding a ? to the end of the segment.

```jsx
<Route path=":lang?/categories" element={<Categories />} />
```

You can have optional static segments, too:

```jsx
<Route path="users/:userId/edit?" element={<User />} />
```

## Splats

Also known as "catchall" and "star" segments. If a route path pattern ends with /\* then it will match any characters following the /, including other / characters.

```jsx
<Route path="files/*" element={<File />} />
```

```jsx
let params = useParams();
// params["*"] will contain the remaining URL after files/
let filePath = params["*"];
```

You can destructure the \*, you just have to assign it a new name. A common name is splat:

```jsx
You can destructure the \*, you just have to assign it a new name. A common name is splat:

let { "\*": splat } = useParams();
```

## Linking

Link to routes from your UI with Link and NavLink.

```jsx
import { NavLink, Link } from "react-router";

function Header() {
  return (
    <nav>
      {/* NavLink makes it easy to show active states */}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <Link to="/concerts/salt-lake-city">Concerts</Link>
    </nav>
  );
}
```

---

Reference: https://reactrouter.com/start/declarative/routing
