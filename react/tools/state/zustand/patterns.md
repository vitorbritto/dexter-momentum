# Single Store

### Creating the Store

```js
// Individual Store
export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});
```

```js
// Another individual Store
export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});
```

```js
// Combined Stores
import { create } from "zustand";
import { createBearSlice } from "./bearSlice";
import { createFishSlice } from "./fishSlice";

export const useBoundStore = create((...args) => ({
  ...createBearSlice(...args),
  ...createFishSlice(...args),
}));
```

### Using in Components

```js
import { useBoundStore } from "./stores/useBoundStore";

function App() {
  const bears = useBoundStore((state) => state.bears);
  const fishes = useBoundStore((state) => state.fishes);
  const addBear = useBoundStore((state) => state.addBear);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
    </div>
  );
}

export default App;
```

### Updating multiple stores

```js
export const createBearFishSlice = (set, get) => ({
  addBearAndFish: () => {
    get().addBear();
    get().addFish();
  },
});
```

```js
import { create } from "zustand";
import { createBearSlice } from "./bearSlice";
import { createFishSlice } from "./fishSlice";
import { createBearFishSlice } from "./createBearFishSlice";

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createBearFishSlice(...a),
}));
```

### Adding Middlewares

```js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createBearSlice } from "./bearSlice";
import { createFishSlice } from "./fishSlice";

export const useBoundStore = create(
  persist(
    (...args) => ({
      ...createBearSlice(...args),
      ...createFishSlice(...args),
    }),
    { name: "bound-store" }
  )
);
```

> Slices Pattern: https://zustand.docs.pmnd.rs/guides/slices-pattern

# Redux-like

```js
const types = { increase: "INCREASE", decrease: "DECREASE" };

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by };
    case types.decrease:
      return { grumpiness: state.grumpiness - by };
  }
};

const useGrumpyStore = create((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}));

const dispatch = useGrumpyStore((state) => state.dispatch);
dispatch({ type: types.increase, by: 2 });
```

### Using redux-middleware

```js
import { redux } from "zustand/middleware";

const useReduxStore = create(redux(reducer, initialState));
```
