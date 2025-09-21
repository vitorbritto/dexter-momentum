# Schema Design

The page on Schema Design has two key ideas:

- Versioning → GraphQL discourages API versioning. Since clients request only the fields they need, adding new fields or types isn’t breaking. The best practice is to continuously evolve the schema while avoiding breaking changes, leading to a “versionless” API.
- Nullability → In GraphQL, all fields are nullable by default. This design handles failures gracefully (e.g., DB down, auth denied, async error). Developers can explicitly use non-null types (!) when a field must always return a value, ensuring stronger guarantees for clients ￼.
