import "./style.css";
import { router } from "./router";

// Define routes
router.addRoute("/", () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <h1>Hello World</h1>
      <ul style="display: flex; align-items: center; justify-content: center; gap: 2rem; list-style: none; padding: 0; margin: 0;">
        <li><a href="#" onclick="router.navigate('/about'); return false;">About</a></li>
        <li><a href="#" onclick="router.navigate('/contact'); return false;">Contact</a></li>
      </ul>
    </div>
  `;
});

router.addRoute("/about", () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <h1>About Page</h1>
      <p>This is the about page!</p>
      <a href="#" onclick="router.navigate('/'); return false;">Back to Home</a>
    </div>
  `;
});

router.addRoute("/contact", () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
      <h1>Contact Page</h1>
      <p>This is the contact page!</p>
      <a href="#" onclick="router.navigate('/'); return false;">Back to Home</a>
    </div>
  `;
});

// Make router globally available for onclick handlers
(window as any).router = router;

// Trigger initial route after all routes are defined
router.handleRoute();
