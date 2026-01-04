# Hide Implementation Details

Hiding implementation details helps to make changes in a component without making changes in the other modules/clients using that component. This can be achieved by creating interfaces and using them instead of the concrete classes.

Encapsulation with proper access management should also be done to expose only the required public functions.

## Example

```ts
// ❌ Without abstraction
class PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing payment of ${amount}`);
  }
}

// ✅ With abstraction
interface PaymentGateway {
  processPayment(amount: number): void;
}

class StripePaymentGateway implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing payment of ${amount} using Stripe`);
  }
}

const paymentProcessor = new PaymentProcessor(new StripePaymentGateway());
paymentProcessor.processPayment(100);
```

# Separation of Concerns

Separation of concerns (SoC) is a design principle for separating a computer program into distinct sections such that each section addresses a separate concern.

A program that embodies SoC well is called a modular program. Modularity, and hence separation of concerns, is achieved by creating well-encapsulated classes that have well-defined interfaces.

We should strive to separate the program into separate sections such that the overlap is as minimal as possible. SoC helps maintenance and also code reuse.

## Example

```ts
// ❌ Without separation of concerns
class PaymentProcessor {
  processPayment(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    console.log(`Processing payment of ${amount}`);
    console.log(`Saving payment of ${amount} in database`);
  }
}
```

```ts
// ✅ With separation of concerns

interface PaymentValidator {
  validate(amount: number): void;
}

class DefaultPaymentValidator implements PaymentValidator {
  validate(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
  }
}

interface PaymentLogger {
  log(amount: number): void;
}

class DefaultPaymentLogger implements PaymentLogger {
  log(amount: number): void {
    console.log(`Processing payment of ${amount}`);
  }
}

class PaymentProcessor {
  constructor(
    private readonly validator: PaymentValidator,
    private readonly logger: PaymentLogger
  ) {}

  processPayment(amount: number): void {
    this.validator.validate(amount);
    this.logger.log(amount);
  }
}

const validator = new DefaultPaymentValidator();
const logger = new DefaultPaymentLogger();
const paymentProcessor = new DefaultPaymentProcessor(validator, logger);
paymentProcessor.processPayment(100);
```

# Maximize Cohesion

Cohesion is the degree to how strongly related and focused are the various responsibilities of a module. It is a measure of the strength of the relationship between the class’s methods and data themselves. We should strive to maximize cohesion. High cohesion results in better understanding, maintaining, and reusing components.

**Cohesion is increased if:**

- The functionalities embedded in a class, accessed through its methods, have much in common.
- Methods carry out a small number of related activities, by avoiding coarsely grained or unrelated sets of data.
- Related methods are in the same source file or otherwise grouped together; for example, in separate files but in the same sub-directory/folder.

# Minimize Coupling

Coupling is the degree to which each module depends on other modules; a measure of how closely connected two modules are. We should strive to minimize coupling.

Coupling is usually contrasted with cohesion. Low coupling often correlates with high cohesion and vice versa.

**Tightly coupled modules have the following disadvantages:**

- Change in one module might break another module.
- Change in one module usually forces a ripple effect of changes in other modules.
- Reusability decreases as dependency over other modules increases.
- Assembly of modules might require more effort and/or time.

**Coupling can be reduced by:**

- By hiding inner details and interacting through interfaces.
- Avoid interacting with classes that it can avoid directly dealing with.
- Components in a loosely coupled system can be replaced with alternative implementations that provide the same services.
