# Pagination

The page explains pagination in GraphQL. It starts with simple lists, then introduces slicing to fetch a subset of items. It compares offset vs cursor-based pagination, noting that cursor-based is more stable and efficient. The concept of edges and connections is used to include both nodes and metadata (like cursor, totalCount, pageInfo with hasNextPage and endCursor). Finally, it references the Relay Connection Specification as the standard for implementing cursor-based pagination.

## Simple Lists

### Basic Implementation

```graphql
type Query {
  users: [User!]!
  posts: [Post!]!
}
```

**Problems:**

- No control over result size
- Can return thousands of items
- Performance issues
- No way to get more data

## Slicing

### Simple Slicing with `first` and `last`

```graphql
type Query {
  users(first: Int, last: Int): [User!]!
  posts(first: Int, last: Int): [Post!]!
}
```

**Example Query:**

```graphql
query GetUsers {
  users(first: 10) {
    id
    name
    email
  }
}
```

**Problems:**

- No way to get next page
- No metadata about total count
- Can't navigate backwards efficiently

## Offset vs Cursor-based Pagination

### Offset-based Pagination

```graphql
type Query {
  users(offset: Int, limit: Int): [User!]!
  usersCount: Int!
}
```

**Example Implementation:**

```javascript
// resolvers.js
const resolvers = {
  Query: {
    users: async (parent, { offset = 0, limit = 10 }, { dataSources }) => {
      return await dataSources.userService.getUsers({
        offset,
        limit,
      });
    },
    usersCount: async (parent, args, { dataSources }) => {
      return await dataSources.userService.getUsersCount();
    },
  },
};
```

**Problems with Offset:**

- Inconsistent results when data changes
- Performance issues with large offsets
- Duplicate or missing items

### Cursor-based Pagination

```graphql
type Query {
  users(first: Int, after: String, last: Int, before: String): UserConnection!
}
```

**Advantages:**

- Stable results even when data changes
- Better performance
- No duplicate items
- Consistent ordering

## Cursor-based Pagination

### Complete Implementation

```graphql
# Schema
type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type User {
  id: ID!
  name: String!
  email: String!
  createdAt: DateTime!
}

type Query {
  users(first: Int, after: String, last: Int, before: String): UserConnection!
}
```

### Resolver Implementation

```javascript
// resolvers/users.js
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      const { first, after, last, before } = args;

      // Validate arguments
      if (first && last) {
        throw new Error("Cannot use both first and last");
      }
      if (after && before) {
        throw new Error("Cannot use both after and before");
      }

      const limit = first || last || 10;
      const cursor = after || before;

      const result = await dataSources.userService.getUsersPaginated({
        limit: limit + 1, // Get one extra to check if there are more
        cursor,
        direction: after ? "forward" : "backward",
      });

      const hasMore = result.length > limit;
      const users = hasMore ? result.slice(0, limit) : result;

      const edges = users.map((user) => ({
        node: user,
        cursor: createCursor(user.id, user.createdAt),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage: hasMore && (first || !last),
          hasPreviousPage: hasMore && (last || !first),
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount: await dataSources.userService.getUsersCount(),
      };
    },
  },
};

// Utility functions
function createCursor(id, timestamp) {
  return Buffer.from(`${id}:${timestamp}`).toString("base64");
}

function parseCursor(cursor) {
  const decoded = Buffer.from(cursor, "base64").toString();
  const [id, timestamp] = decoded.split(":");
  return { id, timestamp: new Date(timestamp) };
}
```

### Service Layer Implementation

```javascript
// services/UserService.js
class UserService {
  constructor(db) {
    this.db = db;
  }

  async getUsersPaginated({ limit, cursor, direction = "forward" }) {
    let query = this.db("users")
      .select("*")
      .orderBy("created_at", direction === "forward" ? "asc" : "desc")
      .limit(limit);

    if (cursor) {
      const { timestamp } = parseCursor(cursor);
      if (direction === "forward") {
        query = query.where("created_at", ">", timestamp);
      } else {
        query = query.where("created_at", "<", timestamp);
      }
    }

    return await query;
  }

  async getUsersCount() {
    const result = await this.db("users").count("* as count").first();
    return result.count;
  }
}
```

### Client Usage Examples

```javascript
// Frontend - First page
const GET_USERS_FIRST_PAGE = gql`
  query GetUsersFirstPage {
    users(first: 10) {
      edges {
        node {
          id
          name
          email
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

// Frontend - Next page
const GET_USERS_NEXT_PAGE = gql`
  query GetUsersNextPage($after: String!) {
    users(first: 10, after: $after) {
      edges {
        node {
          id
          name
          email
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Frontend - Previous page
const GET_USERS_PREVIOUS_PAGE = gql`
  query GetUsersPreviousPage($before: String!) {
    users(last: 10, before: $before) {
      edges {
        node {
          id
          name
          email
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        startCursor
      }
    }
  }
`;
```

## Relay Connection Specification

### Complete Relay-compliant Implementation

```graphql
# Schema following Relay specification
type UserConnection {
  edges: [UserEdge]
  nodes: [User]
  pageInfo: PageInfo!
  totalCount: Int
}

type UserEdge {
  cursor: String!
  node: User
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type User {
  id: ID!
  name: String!
  email: String!
  posts(first: Int, after: String, last: Int, before: String): PostConnection!
}

type PostConnection {
  edges: [PostEdge]
  nodes: [Post]
  pageInfo: PageInfo!
  totalCount: Int
}

type PostEdge {
  cursor: String!
  node: Post
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: DateTime!
}
```

### Advanced Resolver with Relay Compliance

```javascript
// resolvers/relay.js
const {
  connectionFromArray,
  connectionFromPromisedArray,
} = require("graphql-relay");

const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      const users = await dataSources.userService.getAllUsers();
      return connectionFromArray(users, args);
    },

    user: async (parent, { id }, { dataSources }) => {
      return await dataSources.userService.getUserById(id);
    },
  },

  User: {
    posts: async (parent, args, { dataSources }) => {
      const posts = await dataSources.postService.getPostsByUserId(parent.id);
      return connectionFromArray(posts, args);
    },
  },
};
```

### Custom Connection Resolver

```javascript
// resolvers/connections.js
const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      const { first, after, last, before } = args;

      // Get total count
      const totalCount = await dataSources.userService.getUsersCount();

      // Get users with pagination
      const users = await dataSources.userService.getUsersPaginated({
        first,
        after,
        last,
        before,
      });

      // Create edges
      const edges = users.map((user) => ({
        cursor: createCursor(user.id, user.createdAt),
        node: user,
      }));

      // Determine page info
      const hasNextPage = first ? users.length === first + 1 : false;
      const hasPreviousPage = last ? users.length === last + 1 : false;

      return {
        edges: hasNextPage ? edges.slice(0, -1) : edges,
        nodes: users.slice(0, hasNextPage ? -1 : undefined),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor: edges[0]?.cursor,
          endCursor: edges[edges.length - 1]?.cursor,
        },
        totalCount,
      };
    },
  },
};
```

### Advanced Pagination with Filters

```graphql
# Schema with filtering
input UserFilter {
  name: String
  email: String
  role: UserRole
  createdAfter: DateTime
  createdBefore: DateTime
}

type Query {
  users(
    first: Int
    after: String
    last: Int
    before: String
    filter: UserFilter
    sortBy: UserSortField
    sortDirection: SortDirection
  ): UserConnection!
}

enum UserSortField {
  NAME
  EMAIL
  CREATED_AT
}

enum SortDirection {
  ASC
  DESC
}
```

### Filtered Pagination Resolver

```javascript
// resolvers/filtered-pagination.js
const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      const { first, after, last, before, filter, sortBy, sortDirection } =
        args;

      // Build query with filters
      let query = dataSources.userService.buildQuery();

      if (filter) {
        if (filter.name) {
          query = query.where("name", "ilike", `%${filter.name}%`);
        }
        if (filter.email) {
          query = query.where("email", "ilike", `%${filter.email}%`);
        }
        if (filter.role) {
          query = query.where("role", filter.role);
        }
        if (filter.createdAfter) {
          query = query.where("created_at", ">=", filter.createdAfter);
        }
        if (filter.createdBefore) {
          query = query.where("created_at", "<=", filter.createdBefore);
        }
      }

      // Apply sorting
      const sortField = sortBy || "CREATED_AT";
      const direction = sortDirection || "ASC";
      query = query.orderBy(sortField.toLowerCase(), direction.toLowerCase());

      // Apply pagination
      const limit = first || last || 10;
      const cursor = after || before;

      if (cursor) {
        const { timestamp, id } = parseCursor(cursor);
        const operator = after ? ">" : "<";
        query = query.where("created_at", operator, timestamp);
      }

      const users = await query.limit(limit + 1);
      const hasMore = users.length > limit;
      const result = hasMore ? users.slice(0, limit) : users;

      return {
        edges: result.map((user) => ({
          cursor: createCursor(user.id, user.createdAt),
          node: user,
        })),
        pageInfo: {
          hasNextPage: hasMore && (first || !last),
          hasPreviousPage: hasMore && (last || !first),
          startCursor: result[0]
            ? createCursor(result[0].id, result[0].createdAt)
            : null,
          endCursor: result[result.length - 1]
            ? createCursor(
                result[result.length - 1].id,
                result[result.length - 1].createdAt
              )
            : null,
        },
        totalCount: await dataSources.userService.getFilteredCount(filter),
      };
    },
  },
};
```

### React Hook for Pagination

```javascript
// hooks/usePagination.js
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

export const usePagination = (query, variables = {}) => {
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  });

  const [cursors, setCursors] = useState({
    after: null,
    before: null,
  });

  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      ...variables,
      first: 10,
    },
  });

  const goToNextPage = () => {
    if (pageInfo.hasNextPage) {
      setCursors((prev) => ({
        ...prev,
        after: pageInfo.endCursor,
        before: null,
      }));
    }
  };

  const goToPreviousPage = () => {
    if (pageInfo.hasPreviousPage) {
      setCursors((prev) => ({
        ...prev,
        before: pageInfo.startCursor,
        after: null,
      }));
    }
  };

  useEffect(() => {
    if (data?.users?.pageInfo) {
      setPageInfo(data.users.pageInfo);
    }
  }, [data]);

  return {
    data: data?.users,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
  };
};
```

### Performance Optimizations

```javascript
// services/OptimizedUserService.js
class OptimizedUserService {
  constructor(db, redis) {
    this.db = db;
    this.redis = redis;
  }

  async getUsersPaginated({ limit, cursor, direction = "forward" }) {
    const cacheKey = `users:${limit}:${cursor}:${direction}`;

    // Try cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Use database index for efficient pagination
    let query = this.db("users")
      .select("id", "name", "email", "created_at")
      .orderBy("created_at", direction === "forward" ? "asc" : "desc")
      .limit(limit + 1);

    if (cursor) {
      const { timestamp, id } = parseCursor(cursor);
      if (direction === "forward") {
        query = query.where("created_at", ">", timestamp).orWhere(function () {
          this.where("created_at", "=", timestamp).andWhere("id", ">", id);
        });
      } else {
        query = query.where("created_at", "<", timestamp).orWhere(function () {
          this.where("created_at", "=", timestamp).andWhere("id", "<", id);
        });
      }
    }

    const result = await query;

    // Cache for 5 minutes
    await this.redis.setex(cacheKey, 300, JSON.stringify(result));

    return result;
  }
}
```

This comprehensive pagination implementation covers:

- ✅ Simple lists and slicing
- ✅ Offset vs cursor-based comparison
- ✅ Complete cursor-based implementation
- ✅ Relay Connection Specification compliance
- ✅ Advanced filtering and sorting
- ✅ Performance optimizations
- ✅ React integration examples
