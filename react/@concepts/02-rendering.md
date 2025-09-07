# Rendering

After you trigger a render, React calls your components to figure out what to display on screen. So “Rendering” basically means React calling your components.

Rendering is of two types:

- **Initial Rendering**: When your React app first loads, React creates the UI for the first time.
- **Re-rendering**: When state or props change, React updates only the necessary parts of the UI efficiently. (We will see in detail about how this works)

## Initial Rendering

### How it works

In a React Application, check your file `index.jsx` or `main.jsx` to see code similar to this:

```jsx
function App() {
  return <h1>DeepIntoDev</h1>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

#### 1. Entry Point in HTML

The first thing we must check is the entry point in the HTML file at the root of the application.

```html
<div id="root"></div>
```

This is the empty DOM container where your React application will be mounted.

#### 2. Creating the Root

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
```

The `document.getElementById("root")` finds that empty div in your HTML. `ReactDOM.createRoot()` creates a React root instance connected to this DOM node. This establishes the connection between React and the browser DOM.

#### 3. Rendering the App

In this phase, React calls the `App` function component for the first time. This initiates the rendering process.

```jsx
root.render(<App />);
```

#### 4. Component Execution

After that, React calls your App function component. App returns JSX: `<h1>DeepIntoDev</h1>`.

```jsx
function App() {
  return <h1>DeepIntoDev</h1>;
}
```

#### 5. JSX Transformation

React transforms the JSX into React elements.

```js
{
  type: "h1",
  props: { children: "DeepIntoDev" },
}
```

This is a JavaScript object representation of your UI.

#### 6. Virtual DOM Creation

React takes these element objects and constructs a complete tree called the Virtual DOM.

```js
{
  type: "h1",
  props: { children: "DeepIntoDev" },
}
```

This is a lightweight representation of your UI in memory. It's made up of the element objects from the previous step.

#### 7. Initial DOM Updates

React calculates what DOM operations are needed (for initial render, it's creating all elements).

ReactDOM creates the actual DOM nodes:

```js
{
  type: "h1",
  props: { children: "DeepIntoDev" },
}
```

#### 8. Render Complete

The browser displays your rendered React application. This sequence is what happens specifically during initial rendering.

```html
<h1>DeepIntoDev</h1>
```

> **IMPORTANT NOTE:**
>
> In a large application, there are thousands of components, so we end up with a massive JS Object in a tree-like structure. Constructing a DOM from this huge JS object takes a lot of time. But React only constructs the DOM from scratch at the first time.
>
> You may have noticed that when you build your React app for the first time, it takes a while. But in subsequent renders/re-renders, it doesn't take as much time. This optimization is due to the "Virtual DOM" and "reconciliation" algorithms.

## Re-rendering

Re-rendering in React is the process where a component updates and executes again to reflect changes in the UI. However, not every change triggers a re-render — React is optimized to only re-render components when necessary.

**A component re-renders when:**

- Its State Changes (useState)
- Its Props Change (Parent component passes new props)
- Its Parent Re-Renders (Even if props don't change)

### Performance Solutions

- Wrapping Child Components in React.memo()
- Using useMemo and useCallback to memoize values and functions
- Using useRef to access DOM elements
- Using useContext to access the context
- Using useReducer to manage state
- Using useEffect to perform side effects
- Using useLayoutEffect to perform side effects
