# Hooks

Before hooks, components were only able to use state and other React features in class components.

There were a lifecycle methods that were only available in class components.

These were:

- componentDidMount
- componentDidUpdate
- componentWillUnmount

```js
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
```

Hooks were introduced in React 16.8 and allow you to use state and other React features in functional components.

```js
function MyComponent() {
  useEffect(() => {
    console.log("useEffect");
  }, []);
}
```

## Types of hooks

> The `useContext`, `useMemo` and `useCallback` were phased out in React 19.

### useState

`useState` is a hook that allows you to add state to a functional component.

```js
const [count, setCount] = useState(0);
```

### useEffect

`useEffect` is a hook that allows you to perform side effects in a functional component.

```js
useEffect(() => {
  console.log("useEffect");
}, []);
```

### useContext

`useContext` is a hook that allows you to access the context in a functional component.

```js
const context = useContext(Context);
```

### useReducer

`useReducer` is a hook that allows you to manage state in a functional component.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

### useRef

`useRef` is a hook that allows you to access the ref in a functional component.

```js
const ref = useRef(null);
```

### useMemo

`useMemo` is a hook that allows you to memoize a value in a functional component.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useCallback

`useCallback` is a hook that allows you to memoize a function in a functional component.

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### useImperativeHandle

`useImperativeHandle` is a hook that allows you to expose imperative methods to a functional component.

```js
useImperativeHandle(
  ref,
  () => {
    return {
      doSomething: () => {
        doSomething(a, b);
      },
    };
  },
  [a, b]
);
```

### useLayoutEffect

`useLayoutEffect` is a hook that allows you to perform side effects in a functional component.

```js
useLayoutEffect(() => {
  console.log("useLayoutEffect");
}, []);
```
