## Redux

Redux is a popular state management library for JavaScript applications, especially those built with React. It provides a predictable way to manage global state by using a single store that holds the entire state of the application.

### Core Concepts

- **Store**: The single source of truth that holds the state.
- **Actions**: Plain JavaScript objects that describe what happened.
- **Reducers**: Functions that specify how the state changes in response to actions.
- **Dispatch**: The method used to send actions to the store.

### How Redux Works

1. **Dispatching Actions**: Components dispatch actions to signal that something happened (e.g., a user clicked a button).
2. **Reducers Update State**: Reducers receive the current state and the action, and return a new state.
3. **Store Notifies Subscribers**: The store updates and notifies any subscribed components, which can then re-render with the new state.

### Example

```js
const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
```
