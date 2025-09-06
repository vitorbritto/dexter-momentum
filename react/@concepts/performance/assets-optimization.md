# Assets Optimization

“Assets” are everything your React app needs to load in the browser: JavaScript bundles, CSS, images, fonts, icons, and static files. Asset optimization means making those files smaller, faster, and smarter to deliver better performance and user experience.

## 1. Code Splitting & Lazy Loading

- By default, React apps ship one big JS bundle.
- Code splitting (via Webpack, Vite, or Next.js) breaks it into smaller chunks.
- Lazy loading loads components/pages only when needed.

```tsx
const Profile = React.lazy(() => import("./Profile"));

return (
  <Suspense fallback={<div>Loading...</div>}>
    <Profile />
  </Suspense>
);
```

- Benefit → faster initial load.

## 2. Tree Shaking

- Removes unused code (dead code elimination).
- Enabled in modern bundlers (Webpack, Rollup, Vite).
- Example: only importing what you need from libraries like Lodash or dayjs:

## 3. Image Optimization

- Use modern formats: WebP/AVIF → smaller size, same quality.
- Resize images to the actual size used in your components.
- Lazy load images with loading="lazy":

```tsx
<img src="/banner.webp" alt="Banner" loading="lazy" />
```

> For advanced setups (Next.js): <Image /> component automatically optimizes.

## 4. Font Optimization

- Use font-display: swap to avoid invisible text during font load.
- Consider system fonts for speed.
- Self-host fonts instead of fetching from Google Fonts in some cases.

```tsx
<link rel="stylesheet" href="/fonts/font.css" />
```

```css
@font-face {
  font-family: "MyFont";
  src: url("/fonts/myfont.woff2") format("woff2");
  font-display: swap;
}
```

## 5. CSS & Styling

- Minify CSS and JS (bundler does it in production).
- Remove unused CSS (tools like PurgeCSS, Tailwind’s built-in purge).
- Use CSS Modules or CSS-in-JS with critical CSS extraction.

## 6. Caching & CDN

- Serve static assets through a CDN (CloudFront, Vercel, Netlify).
- Use hashed filenames (main.abc123.js) so browsers can cache aggressively.

## 7. Bundle Analysis

- Tools like webpack-bundle-analyzer or vite-bundle-visualizer show what’s taking space.
- Helps spot heavy dependencies and reduce bloat.

## 8. Compression

- Enable Gzip or Brotli compression in the server/CDN.
- Reduces transfer size significantly.

## 9. Summary

Asset optimization in React is about:

- Reducing bundle size (code splitting, tree shaking, minification).
- Loading only what’s needed (lazy loading, image/font optimizations).
- Serving efficiently (CDN, caching, compression).

This results in:

- Faster Time to Interactive (TTI).
- Lower bandwidth usage.
- Better Core Web Vitals → improved SEO and UX.
