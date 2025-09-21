import { Link } from "react-router";

export default function About() {
  return (
    <div id="about">
      <Link to="/">← Go to demo</Link>
      <h1>About React Router Contacts</h1>

      <div>
        <p>
          This is a demo application showing off some of the powerful features
          of React Router, including dynamic routing, nested routes, loaders,
          actions, and more.
        </p>

        <h2>Features</h2>
        <p>Explore the demo to see how React Router handles:</p>
        <ul>
          <li>Data loading and mutations with loaders and actions</li>
          <li>Nested routing with parent/child relationships</li>
          <li>URL-based routing with dynamic segments</li>
          <li>Pending and optimistic UI</li>
        </ul>

        <h2>Learn More</h2>
        <p>
          Check out the official documentation at{" "}
          <a href="https://reactrouter.com">reactrouter.com</a> to learn more
          about building great web applications with React Router.
        </p>
      </div>
    </div>
  );
}
