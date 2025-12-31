# Component Cohesion

Component cohesion is a measure of how well the elements of a component are related to each other. It is a measure of the degree to which the elements of a component are related to each other.

## What is Component Cohesion?

**A component has high cohesion when:**

- Its classes, functions, and data work toward one clear purpose
- Changes in requirements affect only that component
- The component is easy to understand, test, and evolve

**A component has low cohesion when:**

- It mixes unrelated responsibilities
- Small changes trigger changes in many places
- It becomes a “junk drawer” of logic

**High cohesion leads to:**

- Easier maintenance
- Better testability
- Safer refactoring
- Clearer ownership (by team or domain)
- Lower coupling with other components

**Low cohesion leads to:**

- Fragile systems
- Hidden dependencies
- Fear-driven development (“don’t touch this” code)

## Practical Example

**❌ Low Cohesion**

A UserComponent that:

- Validates users
- Sends emails
- Logs analytics
- Formats UI responses

This component changes for many unrelated reasons.

**✅ High Cohesion**

Split into focused components:

- UserValidationComponent
- NotificationComponent
- AnalyticsComponent
- UserQueryComponent

Each component has one reason to change.

## Signs of High Component Cohesion

- Component name clearly describes its purpose
- Most changes are internal to the component
- Public interface is small and intentional
- Internal elements are strongly related
- Tests are simple and focused

## Relationship to Other Principles

- High cohesion enables low coupling
- Strongly related to Single Responsibility Principle
- Core to Clean Architecture and DDD
- Makes components easier to replace and reuse

## Mental Model

- If you can explain a component’s purpose in one sentence, it’s probably cohesive.
- High component cohesion is not about size — it’s about focus.
