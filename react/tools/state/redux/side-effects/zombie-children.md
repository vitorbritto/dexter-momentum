# Zombie Children

## What are Zombie Children?

Zombie Children are components that are still mounted in the DOM after they have been unmounted from the React tree.

## Why do Zombie Children happen?

Zombie Children happen when a component is unmounted from the React tree but is still in the DOM.

## How to avoid Zombie Children?

- Use React.memo to avoid unnecessary re-renders.
- Use React.useEffect to clean up the component when it is unmounted.
- Use React.useCallback to avoid unnecessary re-renders.
- Use React.useMemo to avoid unnecessary re-renders.
- Use React.useRef to avoid unnecessary re-renders.
- Use React.useContext to avoid unnecessary re-renders.
- Use React.useReducer to avoid unnecessary re-renders.

## References

- https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
