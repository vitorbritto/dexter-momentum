# Serving over HTTP

The standard is to use a single endpoint (usually /graphql). Authentication should occur before GraphQL execution, while authorization is handled within the resolvers.

Requests typically use POST with a JSON body containing query, variables, operationName, and extensions. GET can be used only for queries, which is useful for cache/CDN, but is limited by URL length (solution: persisted queries).

Responses should follow the JSON format with data, errors, and optionally extensions. The HTTP status is 200 even with partial errors; validation errors return 400. The recommended media type is application/graphql-response+json.

## Real Production Example: E-commerce Platform

### 1. Complete Server Setup

```javascript
// server.js
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { createContext } = require("./context");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { AuthDirective, RateLimitDirective } = require("./directives");

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});
app.use("/graphql", limiter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  schemaDirectives: {
    auth: AuthDirective,
    rateLimit: RateLimitDirective,
  },
  plugins: [
    // Logging plugin
    {
      requestDidStart() {
        return {
          willSendResponse(requestContext) {
            const { request, response } = requestContext;
            console.log(
              `GraphQL ${request.operationName || "Anonymous"} - ${
                response.http.status
              }`
            );
          },
        };
      },
    },
  ],
  formatError: (error) => {
    // Don't expose internal errors in production
    if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
      return new Error("Internal server error");
    }
    return error;
  },
});

server.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
```

### 2. Production Schema

```graphql
# schema.graphql
scalar DateTime
scalar JSON

type User {
  id: ID!
  email: String!
  name: String!
  avatar: String
  role: UserRole!
  createdAt: DateTime!
  updatedAt: DateTime!
  orders: [Order!]! @auth(requires: "user")
  addresses: [Address!]! @auth(requires: "user")
}

type Product {
  id: ID!
  name: String!
  description: String!
  price: Money!
  images: [String!]!
  category: Category!
  inventory: Int!
  isActive: Boolean!
  tags: [String!]!
  specifications: JSON
  reviews: [Review!]!
  averageRating: Float
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Category {
  id: ID!
  name: String!
  slug: String!
  description: String
  parent: Category
  children: [Category!]!
  products: [Product!]!
}

type Cart {
  id: ID!
  items: [CartItem!]!
  totalItems: Int!
  subtotal: Money!
  tax: Money!
  shipping: Money!
  total: Money!
  appliedCoupons: [Coupon!]!
}

type CartItem {
  id: ID!
  product: Product!
  quantity: Int!
  price: Money!
  total: Money!
}

type Order {
  id: ID!
  orderNumber: String!
  status: OrderStatus!
  items: [OrderItem!]!
  customer: User!
  shippingAddress: Address!
  billingAddress: Address!
  payment: Payment!
  shipping: Shipping!
  subtotal: Money!
  tax: Money!
  shippingCost: Money!
  total: Money!
  notes: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
  price: Money!
  total: Money!
}

type Address {
  id: ID!
  type: AddressType!
  firstName: String!
  lastName: String!
  company: String
  street: String!
  city: String!
  state: String!
  zipCode: String!
  country: String!
  phone: String
  isDefault: Boolean!
}

type Payment {
  id: ID!
  method: PaymentMethod!
  status: PaymentStatus!
  amount: Money!
  transactionId: String
  processedAt: DateTime
  failureReason: String
}

type Shipping {
  id: ID!
  method: ShippingMethod!
  status: ShippingStatus!
  trackingNumber: String
  estimatedDelivery: DateTime
  actualDelivery: DateTime
  carrier: String
}

type Review {
  id: ID!
  product: Product!
  user: User!
  rating: Int!
  title: String!
  content: String!
  isVerified: Boolean!
  helpful: Int!
  createdAt: DateTime!
}

type Coupon {
  id: ID!
  code: String!
  type: CouponType!
  value: Float!
  minOrderAmount: Money
  maxDiscount: Money
  usageLimit: Int
  usedCount: Int!
  isActive: Boolean!
  validFrom: DateTime!
  validUntil: DateTime!
}

type Query {
  # Public queries
  products(
    filter: ProductFilter
    sort: ProductSort
    pagination: PaginationInput
  ): ProductConnection! @rateLimit(max: 100)

  product(id: ID!): Product
  categories: [Category!]!
  category(slug: String!): Category

  # User queries
  me: User @auth(requires: "user")
  cart: Cart @auth(requires: "user")
  orders(filter: OrderFilter, pagination: PaginationInput): OrderConnection!
    @auth(requires: "user")

  # Admin queries
  users(filter: UserFilter, pagination: PaginationInput): UserConnection!
    @auth(requires: "admin")

  allOrders(
    filter: AdminOrderFilter
    pagination: PaginationInput
  ): OrderConnection! @auth(requires: "admin")
}

type Mutation {
  # Authentication
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  logout: Boolean!
  refreshToken: AuthPayload!

  # User mutations
  updateProfile(input: UpdateProfileInput!): User! @auth(requires: "user")
  addAddress(input: AddressInput!): Address! @auth(requires: "user")
  updateAddress(id: ID!, input: AddressInput!): Address! @auth(requires: "user")
  deleteAddress(id: ID!): Boolean! @auth(requires: "user")

  # Cart mutations
  addToCart(input: AddToCartInput!): Cart! @auth(requires: "user")
  updateCartItem(id: ID!, quantity: Int!): Cart! @auth(requires: "user")
  removeFromCart(id: ID!): Cart! @auth(requires: "user")
  clearCart: Cart! @auth(requires: "user")
  applyCoupon(code: String!): Cart! @auth(requires: "user")

  # Order mutations
  createOrder(input: CreateOrderInput!): Order! @auth(requires: "user")
  cancelOrder(id: ID!): Order! @auth(requires: "user")

  # Review mutations
  createReview(input: CreateReviewInput!): Review! @auth(requires: "user")

  # Admin mutations
  createProduct(input: CreateProductInput!): Product! @auth(requires: "admin")
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
    @auth(requires: "admin")
  deleteProduct(id: ID!): Boolean! @auth(requires: "admin")

  updateOrderStatus(id: ID!, status: OrderStatus!): Order!
    @auth(requires: "admin")
  createCoupon(input: CreateCouponInput!): Coupon! @auth(requires: "admin")
}

# Enums
enum UserRole {
  CUSTOMER
  ADMIN
  MODERATOR
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  PAYPAL
  BANK_TRANSFER
  CRYPTO
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}

enum ShippingMethod {
  STANDARD
  EXPRESS
  OVERNIGHT
  INTERNATIONAL
}

enum ShippingStatus {
  PENDING
  PROCESSING
  SHIPPED
  IN_TRANSIT
  DELIVERED
  FAILED
}

enum AddressType {
  SHIPPING
  BILLING
}

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
}

# Input Types
input RegisterInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
}

input LoginInput {
  email: String!
  password: String!
}

input UpdateProfileInput {
  firstName: String
  lastName: String
  avatar: String
}

input AddressInput {
  type: AddressType!
  firstName: String!
  lastName: String!
  company: String
  street: String!
  city: String!
  state: String!
  zipCode: String!
  country: String!
  phone: String
  isDefault: Boolean
}

input AddToCartInput {
  productId: ID!
  quantity: Int!
}

input CreateOrderInput {
  shippingAddressId: ID!
  billingAddressId: ID!
  paymentMethod: PaymentMethod!
  notes: String
}

input CreateReviewInput {
  productId: ID!
  rating: Int!
  title: String!
  content: String!
}

input ProductFilter {
  category: String
  priceRange: PriceRangeInput
  rating: Float
  tags: [String!]
  inStock: Boolean
  search: String
}

input PriceRangeInput {
  min: Float
  max: Float
}

input ProductSort {
  field: ProductSortField!
  direction: SortDirection!
}

enum ProductSortField {
  NAME
  PRICE
  RATING
  CREATED_AT
}

enum SortDirection {
  ASC
  DESC
}

input PaginationInput {
  first: Int
  after: String
  last: Int
  before: String
}

# Connection Types
type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Response Types
type AuthPayload {
  token: String!
  refreshToken: String!
  user: User!
}

type Money {
  amount: Float!
  currency: String!
}
```

### 3. Production Resolvers

```javascript
// resolvers/index.js
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} = require("apollo-server-express");

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  JSON: new GraphQLScalarType({
    name: "JSON",
    description: "JSON custom scalar type",
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (ast) => {
      switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
          return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
          return parseFloat(ast.value);
        case Kind.OBJECT:
          return ast.fields.reduce((obj, field) => {
            obj[field.name.value] = field.value;
            return obj;
          }, {});
        case Kind.LIST:
          return ast.values.map(parseLiteral);
        default:
          return null;
      }
    },
  }),

  Money: {
    amount: (parent) => parent.amount,
    currency: (parent) => parent.currency || "USD",
  },

  Query: {
    products: async (
      parent,
      { filter, sort, pagination },
      { dataSources, user }
    ) => {
      return await dataSources.productService.getProducts({
        filter,
        sort,
        pagination,
        userId: user?.id,
      });
    },

    product: async (parent, { id }, { dataSources }) => {
      const product = await dataSources.productService.getProduct(id);
      if (!product) {
        throw new UserInputError("Product not found");
      }
      return product;
    },

    categories: async (parent, args, { dataSources }) => {
      return await dataSources.categoryService.getCategories();
    },

    me: async (parent, args, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }
      return await dataSources.userService.getUser(user.id);
    },

    cart: async (parent, args, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }
      return await dataSources.cartService.getCart(user.id);
    },

    orders: async (parent, { filter, pagination }, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }
      return await dataSources.orderService.getUserOrders(user.id, {
        filter,
        pagination,
      });
    },
  },

  Mutation: {
    register: async (parent, { input }, { dataSources }) => {
      try {
        const user = await dataSources.userService.createUser(input);
        const tokens = await dataSources.authService.generateTokens(user);
        return {
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
        };
      } catch (error) {
        if (error.code === "EMAIL_EXISTS") {
          throw new UserInputError("Email already exists");
        }
        throw error;
      }
    },

    login: async (parent, { input }, { dataSources }) => {
      try {
        const user = await dataSources.authService.authenticate(input);
        const tokens = await dataSources.authService.generateTokens(user);
        return {
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
        };
      } catch (error) {
        throw new AuthenticationError("Invalid credentials");
      }
    },

    addToCart: async (parent, { input }, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }

      // Check product availability
      const product = await dataSources.productService.getProduct(
        input.productId
      );
      if (!product || !product.isActive) {
        throw new UserInputError("Product not available");
      }

      if (product.inventory < input.quantity) {
        throw new UserInputError("Insufficient inventory");
      }

      return await dataSources.cartService.addItem(user.id, input);
    },

    createOrder: async (parent, { input }, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }

      // Validate cart has items
      const cart = await dataSources.cartService.getCart(user.id);
      if (!cart.items.length) {
        throw new UserInputError("Cart is empty");
      }

      // Process payment
      const paymentResult = await dataSources.paymentService.processPayment({
        amount: cart.total,
        method: input.paymentMethod,
        userId: user.id,
      });

      if (!paymentResult.success) {
        throw new UserInputError("Payment failed: " + paymentResult.error);
      }

      // Create order
      const order = await dataSources.orderService.createOrder({
        ...input,
        userId: user.id,
        items: cart.items,
        paymentId: paymentResult.paymentId,
      });

      // Clear cart
      await dataSources.cartService.clearCart(user.id);

      return order;
    },

    createReview: async (parent, { input }, { user, dataSources }) => {
      if (!user) {
        throw new AuthenticationError("Authentication required");
      }

      // Check if user has purchased this product
      const hasPurchased =
        await dataSources.orderService.hasUserPurchasedProduct(
          user.id,
          input.productId
        );

      if (!hasPurchased) {
        throw new ForbiddenError("You must purchase this product to review it");
      }

      // Check if user already reviewed this product
      const existingReview =
        await dataSources.reviewService.getUserProductReview(
          user.id,
          input.productId
        );

      if (existingReview) {
        throw new UserInputError("You have already reviewed this product");
      }

      return await dataSources.reviewService.createReview({
        ...input,
        userId: user.id,
      });
    },
  },

  Product: {
    reviews: async (parent, args, { dataSources }) => {
      return await dataSources.reviewService.getProductReviews(parent.id);
    },

    averageRating: async (parent, args, { dataSources }) => {
      return await dataSources.reviewService.getProductAverageRating(parent.id);
    },
  },

  Order: {
    orderNumber: (parent) => `ORD-${parent.id.toString().padStart(8, "0")}`,
  },
};

module.exports = { resolvers };
```

### 4. Production Context & Data Sources

```javascript
// context.js
const { verify } = require("jsonwebtoken");
const { UserService } = require("./services/UserService");
const { ProductService } = require("./services/ProductService");
const { CartService } = require("./services/CartService");
const { OrderService } = require("./services/OrderService");
const { PaymentService } = require("./services/PaymentService");
const { ReviewService } = require("./services/ReviewService");
const { AuthService } = require("./services/AuthService");

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

  // Initialize data sources
  const dataSources = {
    userService: new UserService(),
    productService: new ProductService(),
    cartService: new CartService(),
    orderService: new OrderService(),
    paymentService: new PaymentService(),
    reviewService: new ReviewService(),
    authService: new AuthService(),
  };

  return {
    user,
    dataSources,
    // Authorization helpers
    auth: {
      isAuthenticated: () => !!user,
      hasRole: (role) => user?.role === role,
      isOwner: (resourceUserId) => user?.id === resourceUserId,
      canAccess: (resource, action) => {
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

module.exports = { createContext };
```

### 5. Production Environment Configuration

```javascript
// config/database.js
const { Pool } = require("pg");
const Redis = require("redis");

// PostgreSQL connection
const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Redis connection for caching
const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("Redis server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

module.exports = { dbPool, redis };
```

### 6. Production Deployment (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 4000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

This production example includes:

- ✅ Complete e-commerce GraphQL API
- ✅ Authentication & Authorization
- ✅ Rate limiting & Security
- ✅ Error handling & Logging
- ✅ Database integration
- ✅ Caching with Redis
- ✅ Docker deployment
- ✅ Production monitoring
- ✅ Scalable architecture
