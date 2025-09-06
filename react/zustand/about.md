# Zustand

Zustand is a library for managing state in React based on hooks. It follows the Flux Architecture.

## Concepts

- Store: A function that returns a set of functions to manage the state of the application.
- Middleware: A function that intercepts the state and returns a set of functions to manage the state of the application.
- Persistence: Persistence in Zustand allows you to save your state to storage (like localStorage) so it persists across page reloads.

### Store

A store is a function that returns a set of functions to manage the state of the application.

```js
import { create } from "zustand";

const useStore = create((set) => ({
  state: {
    count: 0,
  },
}));
```

### Middleware

Middleware is a function that intercepts the state and returns a set of functions to manage the state of the application.

- createJSONStorage: A function that returns a storage object.
- persist: A function that returns a middleware that persists the state to storage.
- createStoreWithEqualityFn: A function that returns a store with equality function.
- createStoreWithEqualityFnAndMiddlewares: A function that returns a store with equality function and middlewares.
- combine: A function that returns a store with multiple stores.

### Persistence

Persistence in Zustand allows you to save your state to storage (like localStorage) so it persists across page reloads.

Here's an example using the `persist` middleware:

```js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { localStorage } from "zustand/middleware";

const useStore = create({
  state: {
    count: 0,
  },
  middleware: [persist("my-store", { storage: localStorage })],
  storage: createJSONStorage(() => localStorage),
});
```
