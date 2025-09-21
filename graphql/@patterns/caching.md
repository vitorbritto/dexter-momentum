# Caching

The Caching page explains that unlike REST (where URLs act as unique resource identifiers), GraphQL needs explicit globally unique IDs (e.g., an id field) so clients can build caches. Servers may expose UUIDs or construct unique IDs by combining type + identifier. This allows consistent caching, supports patterns like the node interface, and can coexist with legacy IDs via separate fields. The core idea: define a stable, global identifier for objects to enable reliable client-side caching.
