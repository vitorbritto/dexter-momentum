# Resolvers

## What are Resolvers?

Resolvers are the functions that are used to resolve the queries. They are defined using the `resolvers` property of the Apollo Server.

## How to define Resolvers?

Resolvers are defined using the `resolvers` property of the Apollo Server.

## Example

```ts
const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};

export default resolvers;
```
