# Component Coupling

Component Coupling is about how much a component depends on other components.

**In simple terms:**

👉 The less a component knows about others, the better.

## What is Component Coupling?

**A component has low coupling when:**

- It depends on interfaces, not implementations
- Changes in other components rarely affect it
- It can be reused or replaced with minimal impact

**A component has high coupling when:**

- It knows internal details of other components
- Changes in one component force changes in many others
- It’s hard to test in isolation

**Low coupling leads to:**

- Easier changes and refactoring
- Better testability (mocking is simpler)
- Independent deployment and evolution
- Reduced ripple effects

**High coupling leads to:**

- Fragile architectures
- Slow development
- Fear of change
- Tight coordination between teams

## Practical Example

**❌ High Coupling**

A CheckoutComponent that:

- Directly instantiates PaymentService
- Reads database schemas from OrderComponent
- Calls internal methods of InventoryComponent

A small change in any of those breaks checkout.

**✅ Low Coupling**

A CheckoutComponent that:

- Depends on PaymentGateway interface
- Receives InventoryService via dependency injection
- Communicates via events (OrderPlaced)

Now each component can evolve independently.

## Common Sources of High Coupling

- Shared databases
- Direct calls to concrete classes
- Global state
- God components
- Leaking internal models across boundaries

## Relationship to Other Principles

- Low coupling complements high cohesion
- Strongly tied to Dependency Inversion Principle
- Core to Component-Based Architecture
- Essential for microservices and modular monoliths

## Mental Model

- If changing one component makes you change several others, coupling is too high.
- Low coupling is not about isolation — it’s about controlled dependencies.
