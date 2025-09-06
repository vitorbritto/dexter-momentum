# Lazy Loading

Lazy laoding is a technique that allows you to load parts of your application only when they are needed, instead of loading everything at once on the initial loading. In React, this is implemented by combining the `React.lazy` function with `Suspense`.

## Benefits

- Significant reduction in initial page loading time;
- Better user experience, especially on slower connections;
- Loading resources only when they are really needed.

## Cons

- Slower page transitions compared to SPA, as each navigation may require a new server request
- Increased server load, since every request may trigger a render
- Some client-side interactivity may be harder to implement or require extra work

## Example

```tsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

return (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```
