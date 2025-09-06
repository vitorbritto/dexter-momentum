# Re-renders

Re-renders are the process of updating the UI of a component.

## How to avoid re-renders?

- Use React.memo to avoid unnecessary re-renders.
- Use React.useEffect to clean up the component when it is unmounted.
- Use React.useCallback to avoid unnecessary re-renders.
- Use React.useMemo to avoid unnecessary re-renders.
- Use React.useRef to avoid unnecessary re-renders.
- Use React.useContext to avoid unnecessary re-renders.
- Use React.useReducer to avoid unnecessary re-renders.

## How it works

React uses a algorithm called "Diffing" to compare each node in the old and new virtual DOM trees.

The algorithm is based on the following rules:

- If the node is the same, update the props.
- If the node is different, destroy the old node and create a new one.
- If the node is a list, update the items in the list.
- If the node is a text node, update the text.

> The source code of the diff algorithm is here: https://github.com/facebook/react/tree/main/packages/react-reconciler

## Example

```js
const oldVirtualDOM = {
  type: "div",
  props: {
    children: [{ type: "h1", props: { children: "Hello" } }],
  },
};

const newVirtualDOM = {
  type: "div",
  props: {
    children: [{ type: "h1", props: { children: "Hello World!" } }],
  },
};

const diff = diff(oldVirtualDOM, newVirtualDOM);

console.log(diff);
```

The diff will be:

```js
{
  type: "div",
  props: {
    children: [{ type: "h1", props: { children: "Hello World!" } }],
  },
}
```

## Phases

- Render Phase: React builds a new virtual DOM based on the current props and state.
- Reconciliation (Diffing): React compares the new virtual DOM with the previous one to find the minimum changes.
- Commit Phase: React applies the changes to the real DOM.
- Browser Paint: The browser paints the changes to the screen.

## The lifecycle of a component

- The component is mounted, being added to the interface;
- The component is updated and receives new props and state, generally when it undergoes some iteration;
- The component is unmounted, being removed from the interface.
