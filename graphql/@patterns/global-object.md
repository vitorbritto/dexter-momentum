# Global Object

It defines a standard way to expose objects with a globally unique ID through a Node interface and a root node(id: ID!) field. This ensures any object can be refetched using its ID, supporting caching and consistent lookups. Objects implementing Node must have an id: ID!.

The spec guarantees stability (same ID = same object), and covers single and plural root fields. This approach is key for tools like Relay but useful for any GraphQL client.
