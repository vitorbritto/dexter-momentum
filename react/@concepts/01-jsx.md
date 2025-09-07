# JSX (JavaScript Syntax Extension)

JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

It is used to describe the UI of your application.

## How it works

Babel takes the JSX and convert it to the `React.createElement()` function. This function returns a JavaScript object called a React Element.

> We could skip writing JSX in our codebase and write a bunch of React.createElement() function calls. That would work with no problem. Or you can just write JSX—which is much easier—and let Babel convert your code into React Elements.

## Anatomy of a React Elements

### The Function createElement

This function is used to create a React Element.

```js
React.createElement(type, props, ...children);

// Where:
// - type: The type of the element to create. This can be a string (like "div") or a component function (like `UserCard`).
// - props: The properties of the element to create. This can be a object with key-value pairs (like `{ className: "container" }`).
// - children: The children of the element to create. This can be a string (like "Hello") or a component function (like `UserCard`).
```

### The Skeleton of a React Element

As mentioned before, the `createElement` function returns a React Element.

This "element" has the following properties:

```js
{
    type:"",        // The type of the element to create.
    props: {
      type:"",      // The type of the child element to create.
      children:[],  // An array of children elements.
      key:"",       // The key of the child element to create.
      ref:""        // The ref of the child element to create.
    },
    key:"",         // The key of the element to create.
    ref:""          // The ref of the element to create.
}
```

## Example

```js
function App() {
  return (
    <div className="container">
      <h1>DeepIntoDev</h1>
      <UserCard name="react" age={22} />
      <button onClick={() => alert("Button Clicked!")}>Click Me</button>
    </div>
  );
}

function UserCard({ name, age }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
```

**Converting to React Element:**

```js
const element = React.createElement("div", { className: "container" }, [
  React.createElement("h1", {}, "DeepIntoDev"),
  React.createElement(UserCard, { name: "react", age: 22 }),
  React.createElement(
    "button",
    { onClick: () => alert("Button Clicked!") },
    "Click Me"
  ),
]);

console.log("🚀 ~ element:", element);

// Output:
{
  type: "div",
  props: { className: "container" },
  children: [
    { type: "h1", props: { children: "DeepIntoDev" } },
    { type: "div", props: { className: "card" }, children: [
      { type: "h2", props: { children: "react" } },
      { type: "p", props: { children: "Age: 22" } },
    ] },
    { type: "button", props: { onClick: () => alert("Button Clicked!") }, children: "Click Me" },
  ],
}

```

**Result:**

```html
<div class="container">
  <h1>DeepIntoDev</h1>
  <div class="card">
    <h2>react</h2>
    <p>Age: 22</p>
  </div>
</div>
<button onclick="alert('Button Clicked!')">Click Me</button>
```
