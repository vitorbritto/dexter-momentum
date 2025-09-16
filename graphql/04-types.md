# Scalar Types

Scalar Types are the basic data types that can be used in the GraphQL API. They are the building blocks of the GraphQL API.

- **String**: Represents a string of characters.
- **Boolean**: Represents a boolean value.
- **Int**: Represents a whole number.
- **Float**: Represents a floating-point number.
- **ID**: Represents a unique identifier.

### Example

```gql
typeDefs: `#graphql
  type Query {
    id: ID
    name: String
    age: Int
  }
`;
```

# Object Types

Object Types in GraphQL are used to define the structure of objects you can query or mutate. An object type is a collection of fields, where each field has a name and a type. For example, a `User` object type might have fields like `id`, `name`, and `email`. Object types let you describe the shape of your data and how different pieces of data are related to each other.

### Example

```gql
typeDefs: `#graphql
  type Post {
    id: ID
    title: String
    content: String
    author: User
    tags: [String]
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: ID
    name: String
    email: String
  }
`;
```

# Union Types

Union Types in GraphQL let you define a field that can return one of several different object types, but never more than one at the same time. This is useful when a field could return different types of results. For example, a search might return a `User`, a `Post`, or a `Comment`. With a union type, you can group these types together and let the client know that the result could be any one of them.

### Example

```gql
typeDefs: `#graphql
  union Post = User | Comment
`;
```

# Interface Types

Interface Types in GraphQL are abstract types that define a set of fields that other object types must include if they implement the interface. Think of an interface as a contract: any type that implements the interface must have all the fields that the interface describes. This is useful when you want to ensure that different types share some common fields, but can also have their own unique fields. For example, you might have a `Node` interface with an `id` field, and then `User`, `Post`, and `Comment` types that all implement `Node` and therefore all have an `id` field.

### Example

```gql
typeDefs: `#graphql
  interface Node {
    id: ID
  }

  type User implements Node {
    id: ID
    name: String
    email: String
  }

  type Comment implements Node {
    id: ID
    content: String
    author: User
  }

  type Post implements Node {
    id: ID
    title: String
    content: String
    author: User
  }
`;
```

# Enum Types

Enum Types in GraphQL let you define a set of named values. They are useful when a field should only have one out of a specific list of possible values. For example, you might use an enum to represent user roles like `ADMIN`, `USER`, or `GUEST`. This helps make your API more strict and clear, because only the allowed values can be used.

### Example

```gql
typeDefs: `#graphql
  enum UserRole {
    ADMIN
    USER
    GUEST
  }
`;
```

# Input Types

Input types in GraphQL are special types used to pass structured data as arguments to queries and mutations. Unlike regular object types, input types are only used for inputs, not for returning data. They let you group multiple fields together, so you can send complex data (like a whole user object) in a single argument. For example, when creating a new user, you might use an input type to provide the user's name, email, and age all at once. Input types can only contain scalar types, other input types, and lists, but not object types or fields that return functions.

### Example

```gql
typeDefs: `#graphql
  input UserInput {
    name: String
    email: String
    age: Int
  }
`;
```

# Custom Scalars

Custom Scalars in GraphQL let you define your own data types beyond the built-in scalars like `String`, `Int`, or `Boolean`. They are useful when you need to handle special kinds of data, such as dates, URLs, or JSON objects, that don't fit the default types. With custom scalars, you can control how this data is validated, parsed, and serialized in your API. For example, you might create a `Date` scalar to handle date values in a consistent way across your application.

### Example

```gql
typeDefs: `#graphql
  scalar Date
`;
```

# Queries

Query types in GraphQL define the structure of data that clients can request from the API. They list all the available read operations, specifying what fields and objects can be fetched. When you write a query, you are asking for specific fields from the Query type, and the server responds with just that data. This helps clients get exactly what they need, and nothing more.

### Example

```gql
typeDefs: `#graphql
  query {
    id: ID
    name: String
    age: Int
  }
`;
```

# Mutations

Mutation types in GraphQL define the structure of data that clients can send to the API to create, update, or delete data. They list all the available write operations, specifying what fields and objects can be changed. When you write a mutation, you are asking the server to perform an action (like adding a new user), and the server responds with the result of that action. This helps clients modify data in a controlled and predictable way.

### Example

```gql
typeDefs: `#graphql
  mutation {
    id: ID
    name: String
    age: Int
  }
`;
```

# Subscriptions

Subscription types in GraphQL define the structure of real-time data updates that clients can listen to. They list all the available subscription operations, specifying what fields and objects can be sent to clients when certain events happen on the server. When you use a subscription, you are asking the server to notify you whenever specific data changes, so you can get updates automatically without having to ask again. This is useful for features like live chat, notifications, or any situation where you want to see changes as they happen.

### Example

```gql
typeDefs: `#graphql
  subscription {
    id: ID
    name: String
    age: Int
  }
`;
```
