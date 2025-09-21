// Simple client-side router
class Router {
  private routes: Map<string, () => void> = new Map();

  constructor() {
    this.init();
  }

  private init() {
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    // Handle initial page load
    this.handleRoute();
  }

  addRoute(path: string, handler: () => void) {
    this.routes.set(path, handler);
  }

  navigate(path: string) {
    history.pushState({}, "", path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    console.log("Handling route:", path);
    const handler = this.routes.get(path);

    if (handler) {
      console.log("Found handler for:", path);
      handler();
    } else {
      console.log("No handler found, using default route");
      // Default route
      this.routes.get("/")?.();
    }
  }
}

export const router = new Router();
