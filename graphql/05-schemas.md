# Schemas

Schemas are the structure of the GraphQL API. They are defined using the `schema` keyword.

## Queries

A **GraphQL query** is a way to request specific data from a GraphQL API. Queries allow clients to specify exactly which fields and nested objects they need, reducing over-fetching and under-fetching of data. In a GraphQL schema, the `Query` type defines all the available read operations.

For example, a simple query might look like this:

```gql
query {
  user {
    name
  }
}
```

This query asks for the `name` field of the `user` object.

## Mutations

A **GraphQL mutation** is a way to modify data on a GraphQL API. Mutations allow clients to update or create data, and in a GraphQL schema, the `Mutation` type defines all the available write operations.

For example, a simple mutation might look like this:

```gql
mutation {
  createUser(name: "John Doe") {
    id
  }
}
```

This mutation creates a new user with the name "John Doe".

## Subscriptions

A **GraphQL subscription** is a way to subscribe to real-time updates from a GraphQL API. Subscriptions allow clients to receive updates when data changes, and in a GraphQL schema, the `Subscription` type defines all the available subscription operations.

For example, a simple subscription might look like this:

```gql
subscription {
  user {
    name
  }
}
```

This subscription subscribes to the `user` object and receives updates when the `name` field changes.
