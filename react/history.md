# The History of React

## Before React: the world of jQuery, Backbone, and AngularJS

Before the emergence of React, web development was dominated by libraries and frameworks like jQuery, Backbone.js, and AngularJS. jQuery, between 2006 and 2012, revolutionized the way we manipulated the DOM by offering a simple abstraction layer that worked across all browsers. Its logic was based on the idea that the DOM itself represented the state of the application. While practical at first, this model led to imperative code with scattered mutations, often resulting in applications that were difficult to maintain, with code snippets resembling true “spaghetti code.” I’ve even seen projects with multiple $(document).ready(function() { // code }); competing in the same JS file!

Then, in 2010, Backbone.js appeared, bringing a minimal structure for organizing applications. It separated state from the DOM through Models, while Views were responsible for rendering. Still, how to display the interface and define templating was left entirely up to the developer. This minimalist approach offered freedom but also required discipline to avoid inconsistencies. Believe me, I made a lot of mistakes with that freedom myself! Hahaha.

AngularJS, released between 2010 and 2011, took the opposite path from Backbone: it delivered a complete framework for front-end development. It included two-way data binding :(, dependency injection, templates, filters, routing, and a wide range of ready-to-use features. This abundance boosted short-term productivity, especially for back-end developers suddenly tasked with working on the front-end. However, it also brought significant problems: implicit state made application flow hard to understand, debugging was complex, and the heavy use of dirty checking created serious performance costs.

## The idea that changed everything

React was introduced in 2013 with a simple yet bold proposal: treat the interface as a function of state (UI = f(state)). Instead of manually manipulating DOM nodes, developers only needed to describe the desired interface, and React would efficiently reconcile the changes. Its greatest innovation was the creation of a component-based API, which brought three fundamental benefits: composition, reusability, and predictability in development.

## JSX: the union of JavaScript and HTML

This model only made sense because React also introduced JSX, a new way of handling the “separation of concerns.” Instead of dividing code by technology (HTML in one file, CSS in another, JavaScript separate), the idea was to group by UI responsibility, with each component containing everything necessary to render itself. JSX combined the expressiveness of JavaScript with the familiarity of HTML, reducing the noise of templates and bringing the code closer to what users actually saw on the screen. Funny to think JSX was so hated at first and is now celebrated! Hehehe.

## 2014–2020: the era of SPAs

Between 2014 and 2020, React consolidated itself as the foundation for Single Page Applications (SPAs), usually alongside React Router (which today is an incredibly powerful tool!). This approach simplified the building of rich interfaces but also came with trade-offs: increasingly heavy code bundles, loading states scattered across the app, and compromised time-to-interactive. The ecosystem’s response was to reposition React as a UI primitive, while more complete frameworks took over tasks like data fetching, SSR/SSG, routing, and bundling optimization.

## 2020–present: the maturity of the ecosystem

Two projects were decisive in this evolution: Next.js and Remix. Next.js provided server-side rendering (SSR), static site generation (SSG), file-based routing, smart bundling, and automatic route prefetching, delivering significant performance gains without sacrificing the simplicity of React. Remix took it a step further by integrating data loading and actions directly into routing, leveraging Web APIs and edge execution to reduce spinners and request waterfalls. This allowed React to focus on what it does best — rendering the UI — while frameworks took care of data, navigation, and delivery.

## Conclusion

Despite all the changes, React’s philosophy remains firm: componentize, compose, and declare interfaces from state. The API has matured with features like Hooks and Server Components, but the mental model of how to build React applications is still the same.

In the end, React didn’t try to mimic what already existed. Instead, it offered predictability, scalability, and code that more closely matched the final interface. The surrounding ecosystem only strengthened this foundation by solving challenges of performance, delivery, and organization. That’s why, more than a decade later, React still stands strong as a reference in modern web development.
