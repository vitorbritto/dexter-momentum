# Memoization

Memoization is a technique that allows you to cache the result of a function call so that you can reuse the result later.

## Benefits

- Significant reduction in initial page loading time;
- Better user experience, especially on slower connections;
- Loading resources only when they are really needed.

## Cons

- Increased memory usage;
- Potential for stale data if not properly managed;
- Increased complexity of the code.

## Example

```tsx
const memoizedFunction = useMemo(() => {
  return expensiveFunction();
}, [expensiveFunction]);

export default memoizedFunction;
```
