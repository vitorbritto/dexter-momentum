# Authorization

## What is Authorization?

Authorization in GraphQL should be handled in the business logic layer, not directly in resolvers. Authentication happens first, adding user info to the request context. Then, authorization decides if that user can access specific fields or data. While simple checks can be coded in resolvers, production systems should centralize this logic in repositories/services. Optionally, directives (like @auth) can be used in the schema to express rules, but execution should still rely on the business logic layer.

## Example Implementation

### 1. Schema with Authorization Directives

```graphql
type User {
  id: ID!
  email: String!
  name: String!
  posts: [Post!]! @auth(requires: "user")
  privateNotes: String @auth(requires: "admin")
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  publishedAt: DateTime
  draft: Boolean @auth(requires: "user")
}

type Query {
  me: User @auth(requires: "user")
  user(id: ID!): User @auth(requires: "admin")
  posts: [Post!]! @auth(requires: "user")
}

type Mutation {
  createPost(input: CreatePostInput!): Post! @auth(requires: "user")
  deletePost(id: ID!): Boolean! @auth(requires: "admin")
}
```

### 2. Context with User Information

```javascript
// context.js
const { verify } = require("jsonwebtoken");

const createContext = async ({ req }) => {
  let user = null;

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const decoded = verify(token, process.env.JWT_SECRET);
      user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
    }
  } catch (error) {
    console.error("Token verification failed:", error);
  }

  return {
    user,
    // Authorization service
    auth: {
      isAuthenticated: () => !!user,
      hasRole: (role) => user?.role === role,
      isOwner: (resourceUserId) => user?.id === resourceUserId,
      canAccess: (resource, action) => {
        // Business logic for complex authorization rules
        if (!user) return false;

        switch (action) {
          case "read":
            return user.role === "admin" || user.id === resource.userId;
          case "write":
            return user.role === "admin" || user.id === resource.userId;
          case "delete":
            return user.role === "admin";
          default:
            return false;
        }
      },
    },
  };
};
```

### 3. Resolvers with Authorization

```javascript
// resolvers.js
const resolvers = {
  Query: {
    me: async (parent, args, { user, auth }) => {
      if (!auth.isAuthenticated()) {
        throw new Error("Authentication required");
      }
      return await userService.findById(user.id);
    },

    user: async (parent, { id }, { user, auth }) => {
      if (!auth.hasRole("admin")) {
        throw new Error("Admin access required");
      }
      return await userService.findById(id);
    },

    posts: async (parent, args, { user, auth }) => {
      if (!auth.isAuthenticated()) {
        throw new Error("Authentication required");
      }
      return await postService.findByUserId(user.id);
    },
  },

  User: {
    posts: async (parent, args, { user, auth }) => {
      // Only show posts if user is the owner or admin
      if (!auth.canAccess(parent, "read")) {
        return [];
      }
      return await postService.findByUserId(parent.id);
    },

    privateNotes: async (parent, args, { user, auth }) => {
      if (!auth.hasRole("admin")) {
        return null; // Hide field for non-admin users
      }
      return parent.privateNotes;
    },
  },

  Post: {
    draft: async (parent, args, { user, auth }) => {
      // Only show draft status to post owner or admin
      if (!auth.canAccess(parent, "read")) {
        return null;
      }
      return parent.draft;
    },
  },

  Mutation: {
    createPost: async (parent, { input }, { user, auth }) => {
      if (!auth.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      return await postService.create({
        ...input,
        authorId: user.id,
      });
    },

    deletePost: async (parent, { id }, { user, auth }) => {
      const post = await postService.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }

      if (!auth.canAccess(post, "delete")) {
        throw new Error("Insufficient permissions");
      }

      return await postService.delete(id);
    },
  },
};
```

### 4. Authorization Service (Business Logic Layer)

```javascript
// services/authorizationService.js
class AuthorizationService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async canUserAccessResource(userId, resource, action) {
    const user = await this.userRepository.findById(userId);
    if (!user) return false;

    // Admin can do everything
    if (user.role === "admin") return true;

    // Owner can read and write their own resources
    if (user.id === resource.userId) {
      return ["read", "write"].includes(action);
    }

    // Public resources can be read by anyone
    if (action === "read" && resource.isPublic) {
      return true;
    }

    return false;
  }

  async canUserAccessField(userId, fieldName, resource) {
    const user = await this.userRepository.findById(userId);
    if (!user) return false;

    // Field-specific rules
    const fieldRules = {
      privateNotes: user.role === "admin",
      draft: user.id === resource.userId || user.role === "admin",
      email: user.id === resource.userId || user.role === "admin",
    };

    return fieldRules[fieldName] || true;
  }
}
```

### 5. Custom Directive Implementation

```javascript
// directives/authDirective.js
const { SchemaDirectiveVisitor } = require("apollo-server-express");

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { requires } = this.args;
    const { resolve } = field;

    field.resolve = async function (...args) {
      const [, , context] = args;
      const { user, auth } = context;

      if (!auth.isAuthenticated()) {
        throw new Error("Authentication required");
      }

      if (requires && !auth.hasRole(requires)) {
        throw new Error(`Role '${requires}' required`);
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = { AuthDirective };
```

### 6. Usage Example

```javascript
// server.js
const { ApolloServer } = require("apollo-server-express");
const { AuthDirective } = require("./directives/authDirective");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  schemaDirectives: {
    auth: AuthDirective,
  },
});
```

This example shows a complete authorization system that:

- Uses JWT tokens for authentication
- Implements role-based access control
- Handles field-level authorization
- Uses custom directives for schema-level rules
- Centralizes business logic in services
- Provides flexible permission checking
