# Validation

Validation in GraphQL is the process of ensuring that a query or mutation sent by a client is syntactically and semantically correct according to the schema before it is executed. This step helps catch errors early and prevents invalid or malicious queries from reaching your data layer.

## How Validation Works

When a GraphQL server receives a request, it performs validation by checking the following:

- **Syntax**: The query must be well-formed according to the GraphQL language specification.
- **Schema Compliance**: The fields, types, and operations used in the query must exist in the schema and be used correctly.
- **Type Checking**: The arguments and variables must match the expected types defined in the schema.
- **Fragments**: Fragment spreads must be valid and used on compatible types.
- **Directives**: Any directives used must be defined and applied in the correct locations.

If any validation rule fails, the server returns an error and does not execute the query.

## Example of Validation Error

Suppose your schema defines a `User` type with a `name` field, but a client queries for a non-existent `age` field:

```gql
query {
  user {
    age
  }
}
```

The server will return an error:

```gql
{
  "errors": [
    {
      "message": "Field 'age' was not found in type 'User'.",
      "locations": [{ "line": 3, "column": 5 }]
    }
  ]
}
```
