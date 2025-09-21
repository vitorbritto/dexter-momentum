# Zustand useShallow Performance Demo

This project demonstrates the performance benefits of using `useShallow` from Zustand to prevent unnecessary re-renders in React components.

## What This Demo Shows

The demo compares two versions of the same components:

1. **Without useShallow** (Red borders) - Components re-render on EVERY store update
2. **With useShallow** (Green borders) - Components only re-render when their specific data changes

## Features

- **E-commerce store** with products, cart, and filters
- **Side-by-side comparison** of performance optimization
- **Real-time re-render tracking** in the console
- **Interactive testing** with cart operations and filters

## How to Run

1. **Install dependencies:**

   ```bash
   cd react/zustand/useShallow-demo
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

3. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## How to Test the Performance Difference

### 1. Open the Console

- Open your browser's Developer Tools (F12)
- Go to the Console tab
- You'll see logs every time a component re-renders

### 2. Test Cart Operations

- **Add items to cart** using the "Add to Cart" buttons
- **Remove items from cart** using the "Remove" buttons
- **Notice in the console:**
  - Components WITHOUT useShallow re-render every time ANY cart item changes
  - Components WITH useShallow only re-render when THEIR specific cart item changes

### 3. Test Filters

- **Change category** using the dropdown
- **Toggle "Show in stock only"** checkbox
- **Adjust price range** using the slider
- **Notice in the console:**
  - Filter controls only re-render when filter values change
  - Product cards only re-render when their data is affected by filters

### 4. Force Re-render

- Click the **"Force Re-render"** button
- **Notice in the console:**
  - Components WITHOUT useShallow re-render unnecessarily
  - Components WITH useShallow avoid unnecessary re-renders

## Key Performance Benefits

### Without useShallow:

- ❌ **ProductCard** re-renders on EVERY store update
- ❌ If you have 100 products, updating one cart item causes 100 re-renders
- ❌ Performance degrades exponentially with more products

### With useShallow:

- ✅ **ProductCard** only re-renders when its specific data changes
- ✅ Updating one cart item only re-renders the affected product card
- ✅ Performance remains consistent regardless of product count

## When to Use useShallow

1. **Selecting multiple values** from the store
2. **Computed/derived values** that might create new objects
3. **Components that subscribe to specific subsets** of store data
4. **Performance-critical components** in large applications
5. **Preventing unnecessary re-renders** in list items

## Code Examples

### ❌ Without useShallow (Multiple selectors)

```typescript
const product = useEcommerceStore((state) =>
  state.products.find((p) => p.id === productId)
);
const cartItem = useEcommerceStore((state) =>
  state.cartItems.find((item) => item.productId === productId)
);
```

### ✅ With useShallow (Single selector)

```typescript
const { product, cartItem } = useEcommerceStore(
  useShallow((state) => ({
    product: state.products.find((p) => p.id === productId),
    cartItem: state.cartItems.find((item) => item.productId === productId),
  }))
);
```

## Project Structure

```
src/
├── components/
│   ├── ProductCardWithoutShallow.tsx  # ❌ Without optimization
│   ├── ProductCardWithShallow.tsx     # ✅ With useShallow
│   ├── CartSummary.tsx                # ✅ Cart summary with useShallow
│   ├── FilterControls.tsx             # ✅ Filters with useShallow
│   └── PerformanceDemo.tsx            # Main demo component
├── store/
│   └── ecommerceStore.ts              # Zustand store
├── App.tsx                            # Root component
└── main.tsx                           # Entry point
```

## Technologies Used

- **React 18** with TypeScript
- **Zustand** for state management
- **Vite** for build tooling
- **CSS-in-JS** for styling

## Learn More

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [useShallow API Reference](https://github.com/pmndrs/zustand#useshallow)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)














