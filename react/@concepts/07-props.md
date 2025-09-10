# Props

Props are the data that is passed to a component.

## How to use it

```js
const MyComponent = (props) => {
  return <div>{props.name}</div>;
};

// Usage:
<MyComponent name="John" />;
```

Or destructuring props and being more explicit:

```js
const MyComponent = ({ name }) => <div>{name}</div>;
// Usage:
<MyComponent name="John" />;
```

Or passing a children component:

```js
const MyComponent = ({ children }) => <div>{children}</div>;

// Usage:
<MyComponent>
  <p>Hello</p>
</MyComponent>;
```

## In Summary

- Props are the data that is passed to a component.
- They are passed as attributes to the component.
- They are read-only.
- They are immutable.
- Work like custom attributes in components.
- Can be any type of data, even other components.
- The children prop is a special one used for composition.
