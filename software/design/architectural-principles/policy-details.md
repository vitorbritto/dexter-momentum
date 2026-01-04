# Policy vs Detail

The distinction between policy and detail refers to the separation of high-level decisions and low-level implementation details.

**Policy** refers to the high-level decisions that define the overall behavior and structure of the system. These decisions include things like the overall architecture, the system's interface, and the major components and their interactions. Policy decisions are often made by architects and designers, and they set the overall direction for the system.

**Detail** refers to the low-level implementation details that are required to implement the policy decisions. These include things like the specific algorithms, data structures, and code that make up the system's components. Details are often implemented by developers and are responsible for the actual functioning of the system.

## Example 1: Web Application Architecture

**Policy**

- The system must be stateless
- Communication must happen via HTTP APIs
- Business rules must be independent of frameworks

**Detail**

- Use Express.js or Fastify
- Use JWT for authentication
- Use PostgreSQL with an ORM

> 👉 Frameworks and tools can change; the architectural intent stays.

## Example 2: Authentication & Security

**Policy**

- Only authenticated users can access protected resources
- Authentication must support token refresh
- Sensitive data must never be exposed to the client

**Detail**

- Implement OAuth 2.0 with Cognito
- Store tokens in HTTP-only cookies
- Use AES encryption for sensitive fields

> 👉 Security goals are policy; mechanisms are detail.

## Example 3: Error Handling

**Policy**

- Errors must be predictable and user-friendly
- Internal errors must not leak implementation details
- All errors must be observable

**Detail**

- Return HTTP 400, 401, 500
- Use try/catch blocks
- Log errors to Datadog

> 👉 The experience and guarantees matter more than how logging is done.

## Example 4: Business Rules (Domain)

**Policy**

- A proposal can only be approved if it passes validation
- A proposal cannot be approved twice
- Approval must be auditable

**Detail**

- Validate fields with a schema library
- Store approval state in a database column
- Write audit logs to a table or event stream

## Example 5: Frontend Application

**Policy**

- The UI must remain responsive under slow network conditions
- The user must always understand what is happening
- Errors must not block navigation entirely

**Detail**

- Show loading skeletons
- Use React Suspense or spinners
- Display toast notifications

## Example 6: Performance

**Policy**

- Page load must stay under 1 second for most users
- Interactions must feel instant
- Performance regressions must be detected early

**Detail**

- Optimize bundle size
- Lazy-load components
- Measure with RUM and LCP/INP

> 👉 Targets and guarantees are policy; optimizations are detail.
