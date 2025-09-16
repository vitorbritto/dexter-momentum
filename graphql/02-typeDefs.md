# Type Definitions

## What are Type Definitions?

Type Definitions are the schema of the GraphQL API. They define the types of the data that can be queried and the relationships between the types.

## How to define Type Definitions?

Type Definitions are defined using the `typeDefs` property of the Apollo Server.

## Example

```ts
const typeDefs = `
  type Query {
    hello: String
  }
`;

export default typeDefs;
```
