# Architectural Design Patterns

POSA (Pattern-Oriented Software Architecture) is a set of design patterns for developing software systems that can scale and adapt to changing requirements. These patterns were first described in the book "Patterns of Scalable, Reliable Services" by Kevin Hoffman.

POSA patterns are divided into four categories:

- Partitioning Patterns
- Placement Patterns
- Routing Patterns
- Federation Patterns

## Partitioning Patterns

Divide the system into smaller, more manageable parts.

### Use cases

- Large systems become monolithic and difficult to evolve
- Changes in one area break other areas
- Teams step on each other's code

### Idea

Separate responsibilities by domain, function or context, reducing coupling and increasing autonomy.

### Example

A credit platform / fintech would be partitioned into:

- Loan
- Customer
- Payment

## Placement Patterns

Decide where each part of the system runs.

### Use cases

- High latency
- Unnecessary costs
- Over-engineering of infrastructure

### Example

A high-traffic web application would be placed into:

- Static assets: CDN (edge)
- API GraphQL: Regional backend
- Heavy processing: Asynchronous jobs
- Read cache: Redis / DynamoDB

## Routing Patterns

Decide how requests flow through the system.

### Use cases

- Systems with many services
- Complex conditional flows
- API evolution without breaking clients

### Example

Control the request path, without spreading decision logic throughout the system.

- API Gateway
- BFF (Backend for Frontend)
- Reverse Proxy
- Event routing (EventBridge, Kafka)

> 📌 Result: less coupling, more flexibility and secure evolution.

## Federation Patterns

Compose multiple systems as if they were one.

### Use cases

- Many independent services
- Frontend making N calls
- Orchestration spread across the client

### Example

Unify data and contracts, without unifying implementations.

- GraphQL Federation
- API Composition
- Data Virtualization

> 📌 Result: simple frontend, independent teams, less direct coupling.

# Summary

| Pattern      | Question answered                      |
| ------------ | -------------------------------------- |
| Partitioning | How to divide the system?              |
| Placement    | Where each part runs?                  |
| Routing      | Where the request passes?              |
| Federation   | How to unite systems without coupling? |

# Conclusion

These patterns are not exclusive. A mature architecture uses all of them at the same time, consciously.

Architecture is not about choosing technology. It's about deciding boundaries, paths and responsibilities.
