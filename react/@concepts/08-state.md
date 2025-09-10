# State

State represents the data that a component manages internally and can be changed by the user or by the component itself.

This could be things like:

- The current count of a counter
- The current value of an input
- The current state of a form
- The current state of a modal

There is also global state, which relates to the App as a whole and not a single component.

## Types of state

- Local state (useState, useReducer)
- Global state (useContext)
- Server state (useQuery, useMutation)
- URL state (useSearchParams)

## In Summary

- State is the data that a component manages internally and can be changed by the user or by the component itself.
- It is used to store the data that changes over time.
- Represents a “snapshot” of the application at a given moment.
- Unlike regular variables, state changes trigger re-renders.
- Managed with _hooks_ like useState or useReducer.
