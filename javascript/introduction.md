# An Introduction to JavaScript

Let's understand what makes JavaScript so special, what we can do with it, and which other technologies it integrates well with.

# What is JavaScript?

JavaScript was initially created to "bring web pages to life".

Programs in this language are called scripts. They can be written directly in the page's HTML and executed automatically when the page loads.

Scripts are provided and executed as plain text. They don't need any special preparation or compilation to work.

In this regard, JavaScript is quite different from another language called Java.

# Why is it called JavaScript?

When JavaScript was created, it had another name: LiveScript. But since Java was very popular at the time, they decided to position the new language as Java's "little brother" to attract more attention.

Over time, JavaScript evolved and became a completely independent language, with its own specification called ECMAScript, and today it has no relation to Java.

Currently, JavaScript can be executed not only in the browser, but also on servers or on any device that has a special program called a JavaScript engine.

The browser has a built-in engine, sometimes called a "JavaScript virtual machine".

Different engines have different codenames, for example:
• V8 – in Chrome, Opera and Edge.
• SpiderMonkey – in Firefox.
• Other codenames include "Chakra" (IE), "JavaScriptCore", "Nitro" and "SquirrelFish" (Safari).

These names are useful to remember, as they appear frequently in development articles. We'll use them too. For example, if "feature X is supported by V8", then it probably works in Chrome, Opera and Edge.

# How do engines work?

Engines are complex, but the basics are simple:

1. The engine (built into the browser) reads (parses) the script.
2. Then, it converts (compiles) the script to machine code.
3. And then the machine code is executed, quickly.

The engine applies optimizations at each step of the process. It observes the code execution, analyzes the data that flows through it, and adjusts the machine code to further improve performance.

# What can JavaScript do?

Modern JavaScript is a "safe" programming language. It doesn't provide direct access to memory or the processor, because it was made for browsers, which don't need that.

JavaScript's capabilities depend heavily on the environment where it's being executed. For example, Node.js allows reading/writing files, making network requests, etc.

In the browser, JavaScript can do everything related to page manipulation, user interaction, and communication with the server:

-   Add or change HTML elements, modify styles.
-   React to user actions: clicks, mouse movements, key presses.
-   Send and receive data over the network (AJAX, COMET).
-   Manipulate cookies, show messages, ask questions to the user.
-   Store data locally (localStorage).

# What cannot JavaScript do?

Limitations exist to protect the user. A malicious page cannot:

-   Read/write arbitrary files on the hard drive or execute programs.
-   Directly access the operating system.

The browser allows some interaction with files, but only when the user acts, for example, dropping a file on the screen or selecting with <input>.

It's possible to access camera, microphone and other devices, but always with explicit user permission. A JavaScript page cannot secretly activate the webcam.

Tabs and windows generally don't know about each other. In some cases, if one tab opens another, there can be communication, but only if they're from the same domain (same origin: domain, protocol and port).

This is called the "Same Origin Policy". For two pages to communicate with each other, they must agree and use specific JavaScript code for that.

JavaScript can easily communicate with the server where the page came from, but can only access other sites if the server explicitly allows it (with appropriate HTTP headers).

Outside the browser (like on the server), these limitations don't exist. Plugins and extensions can have extended permissions.

# What makes JavaScript unique?

At least three things make JavaScript special:

1. Full integration with HTML and CSS.
2. Simple things are easy to do.
3. Supported by all modern browsers and enabled by default.

No other browser technology combines these three qualities. That's why JavaScript is the most used tool for creating web interfaces.

But it can also be used to create servers, mobile apps and much more.

# Languages "above" JavaScript

JavaScript's syntax doesn't please everyone. That's why several languages emerged that are converted (transpiled) to JavaScript before being executed in the browser.

Modern tools make this conversion fast and almost invisible.

Some examples:

-   CoffeeScript: brings a shorter and cleaner syntax. Widely used by those coming from Ruby.
-   TypeScript: adds static typing to facilitate the development of large systems. Created by Microsoft.
-   Flow: also adds typing, but in a different way. Created by Facebook.
-   Dart: independent language with its own engine, but can also be converted to JavaScript. Created by Google.

Even when using these languages, it's essential to know JavaScript to understand what's happening.

# Summary

-   JavaScript was created to run in browsers, but today is used in many other contexts.
-   It's the most adopted language for creating web interfaces, with full integration with HTML/CSS.
-   There are several languages that are converted to JavaScript and add extra features — it's worth knowing them after mastering JavaScript.
