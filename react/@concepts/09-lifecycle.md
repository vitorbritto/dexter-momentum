# Lifecycle

A lifecycle is the process of a component being created, updated, and destroyed.

It was used in class components. But now with hooks, we can perform the same actions with hooks.

## Types of lifecycle in class components

- **Mounting**: constructor, render, componentDidMount
- **Updating**: render, componentDidUpdate, shouldComponentUpdate, getDerivedStateFromProps, getSnapshotBeforeUpdate, componentDidUpdate
- **Unmounting**: componentWillUnmount

## Types of lifecycle in functional components

- `useEffect`: componentDidMount, componentDidUpdate, componentWillUnmount
- `useLayoutEffect`: componentDidMount, componentDidUpdate
- `useMemo`: componentDidMount, componentDidUpdate
- `useCallback`: componentDidMount, componentDidUpdate
- `useRef`: componentDidMount, componentDidUpdate
- `useContext`: componentDidMount, componentDidUpdate
- `useReducer`: componentDidMount, componentDidUpdate
- `useImperativeHandle`: componentDidMount, componentDidUpdate
- `useDebugValue`: componentDidMount, componentDidUpdate
