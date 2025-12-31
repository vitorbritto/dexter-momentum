# Structural Design Patterns

Structural patterns deal with the composition of classes and objects to form larger structures. Their focus is on how objects are put together to build more complex systems while ensuring flexibility and efficiency. These patterns help in organizing classes and objects into larger structures, making the system more robust and easier to maintain. They often involve concepts like inheritance and composition to define relationships between entities, ensuring that changes to one part of the system have minimal impact on others.

- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Flyweight
- Proxy

## Adapter

The Adapter pattern is a structural design pattern that allows objects with incompatible interfaces to collaborate. It acts as a bridge between two incompatible interfaces, converting the interface of one class into another interface that clients expect. This pattern is useful when you need to integrate classes that have different interfaces, or when you need to provide a unified interface to a set of classes.

### Use cases

When you need to make incompatible interfaces work together.

| Scenario                         | Description                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Third-party SDK integration      | Adapt a payment or messaging SDK (Stripe, Twilio, etc.) to a common internal interface. |
| Legacy system integration        | Wrap an old API so it fits a new domain model without refactoring the whole system.     |
| Multiple providers, one contract | Normalize different email/SMS/push providers behind a single interface.                 |

### Example

```ts
interface PaymentGateway {
  charge(amount: number): void;
}

// Stripe SDK
class StripeSDK {
  makePayment(value: number) {}
}

// PayPal SDK
class PayPalSDK {
  makePayment(value: number) {}
}

// PayPal Adapter
class PayPalAdapter implements PaymentGateway {
  constructor(private sdk: PayPalSDK) {}

  charge(amount: number) {
    this.sdk.makePayment(amount);
  }
}

// Stripe Adapter
class StripeAdapter implements PaymentGateway {
  constructor(private sdk: StripeSDK) {}

  charge(amount: number) {
    this.sdk.makePayment(amount);
  }
}

// Usage
const stripeSDK = new StripeSDK();
const stripeAdapter = new StripeAdapter(stripeSDK);
stripeAdapter.charge(100);

const paypalSDK = new PayPalSDK();
const paypalAdapter = new PayPalAdapter(paypalSDK);
paypalAdapter.charge(100);
```

## Bridge

The Bridge pattern is a structural design pattern that allows you to separate the abstraction from the implementation so that the two can vary independently. It's useful when you need to be able to change the implementation of an abstraction without changing the client code that uses it.

### Use cases

When two dimensions of change must evolve independently.

| Scenario                         | Description                                        |
| -------------------------------- | -------------------------------------------------- |
| Channel x message type           | Email/SMS/Push x simple/urgent/marketing messages. |
| Repository x database technology | InvoiceRepository x MySQL/Postgres/DynamoDB.       |
| Storage x file format            | S3/GCS/Azure x PDF/CSV/JSON.                       |

### Example

```ts
// Abstraction
abstract class Notification {
  constructor(protected sender: NotificationSender) {}

  abstract notify(): void;
}

// Concrete Abstraction
class SimpleNotification extends Notification {
  notify() {
    this.sender.send("Mensagem simples");
  }
}

class UrgentNotification extends Notification {
  notify() {
    this.sender.send("⚠️ Mensagem urgente");
  }
}

// Implementation
interface NotificationSender {
  send(message: string): void;
}

class EmailSender implements NotificationSender {
  send(message: string) {
    console.log(`Email enviado: ${message}`);
  }
}

class SmsSender implements NotificationSender {
  send(message: string) {
    console.log(`SMS enviado: ${message}`);
  }
}

// Usage
const email = new EmailSender();
const sms = new SmsSender();

const n1 = new SimpleNotification(email);
n1.notify();

const n2 = new UrgentNotification(sms);
n2.notify();
```

## Composite

The Composite pattern is a structural design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

### Use cases

When individual objects and groups must be treated the same way.

| Scenario              | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| Permissions and roles | Single permission vs group of permissions.                 |
| Invoice grouping      | Single invoice item vs group of items by CNPJ or customer. |
| UI trees              | Menu, submenu, and menu item with the same interface.      |

### Example

```ts
// Component
interface PermissionNode {
  has(permission: string): boolean;
}

// Leaf
class Permission implements PermissionNode {
  constructor(private name: string) {}

  has(permission: string): boolean {
    return this.name === permission;
  }
}

// Composite
class PermissionGroup implements PermissionNode {
  private children: PermissionNode[] = [];

  constructor(private groupName: string) {}

  add(node: PermissionNode) {
    this.children.push(node);
  }

  remove(node: PermissionNode) {
    this.children = this.children.filter((c) => c !== node);
  }

  has(permission: string): boolean {
    return this.children.some((child) => child.has(permission));
  }
}

// Usage
const canRead = new Permission("read");
const canWrite = new Permission("write");
const canDelete = new Permission("delete");

const editor = new PermissionGroup("editor");
editor.add(canRead);
editor.add(canWrite);

const admin = new PermissionGroup("admin");
admin.add(editor); // composite inside a composite
admin.add(canDelete);

console.log(admin.has("read")); // true
console.log(admin.has("delete")); // true
console.log(editor.has("delete")); // false
```

## Decorator

The Decorator pattern is a structural design pattern that allows you to add new functionality to an object dynamically without changing its structure. It's useful when you need to be able to add new functionality to an object without changing its structure.

### Use cases

When behavior must be added dynamically without modifying the original class.

| Scenario               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| Cross-cutting concerns | Logging, metrics, retries, tracing around use cases. |
| HTTP clients           | Base client + auth + timeout + cache decorators.     |
| Optional validations   | Extra rules applied only in specific flows.          |

### Example

```ts
interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`📧 Sending email: ${message}`);
  }
}

abstract class NotifierDecorator implements Notifier {
  constructor(protected notifier: Notifier) {}

  send(message: string): void {
    this.notifier.send(message);
  }
}

class LoggingDecorator extends NotifierDecorator {
  send(message: string): void {
    console.log("📝 Log before sending");
    super.send(message);
  }
}

class MetricsDecorator extends NotifierDecorator {
  send(message: string): void {
    console.log("📊 Metrics registered");
    super.send(message);
  }
}

// Usage
const notifier = new MetricsDecorator(
  new LoggingDecorator(new EmailNotifier())
);

notifier.send("Invoice created successfully");
```

## Facade

The Facade pattern is a structural design pattern that provides a simplified interface to a complex system. It's useful when you need to be able to simplify a complex system without changing the client code that uses it.

### Use cases

When you want to hide complexity behind a simple interface.

| Scenario                   | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Complex business flows     | Invoice creation involving validation, calculation, persistence, and notification. |
| Service orchestration      | Onboarding that calls KYC, fraud detection, CRM, and billing services.             |
| Backend-for-Frontend (BFF) | A single API endpoint orchestrating multiple internal services.                    |

### Example

```ts
class InvoiceValidator {
  validate() {}
}

class InvoiceCalculator {
  calculate() {}
}

class InvoiceRepository {
  save() {}
}

class NotificationService {
  notify() {}
}

// Facade
class CreateInvoiceFacade {
  private validator = new InvoiceValidator();
  private calculator = new InvoiceCalculator();
  private repository = new InvoiceRepository();
  private notifier = new NotificationService();

  create() {
    this.validator.validate();
    this.calculator.calculate();
    this.repository.save();
    this.notifier.notify();
  }
}

// Usage
const createInvoiceFacade = new CreateInvoiceFacade();
createInvoiceFacade.create();
```

## Flyweight

The Flyweight pattern is a structural design pattern that allows you to share objects in a large number of similar objects to reduce memory usage. It's useful when you need to be able to share objects in a large number of similar objects to reduce memory usage.

### Use cases

When many identical objects exist and memory usage matters.

| Scenario                        | Description                                   |
| ------------------------------- | --------------------------------------------- |
| Shared states or statuses       | Invoice statuses, types, categories.          |
| Immutable configuration objects | Shared calculation or rule definitions.       |
| Large-scale rendering           | Thousands of identical UI or canvas elements. |

### Example

```ts
class InvoiceStatus {
  constructor(public readonly name: string) {}
}

class InvoiceStatusFactory {
  private static cache: Record<string, InvoiceStatus> = {};

  static get(name: string): InvoiceStatus {
    if (!this.cache[name]) {
      this.cache[name] = new InvoiceStatus(name);
    }
    return this.cache[name];
  }
}

// Usage
const paid1 = InvoiceStatusFactory.get("PAID");
const paid2 = InvoiceStatusFactory.get("PAID");

console.log(paid1 === paid2); // true (same instance)
```

## Proxy

The Proxy pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. It's useful when you need to be able to control access to an object without changing the client code that uses it.

### Use cases

When access to an object must be controlled or enhanced.

| Scenario                   | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| Caching                    | Cache reads for invoices, configs, or reference data.               |
| Security and authorization | Check permissions before delegating to the real service.            |
| Lazy loading               | Defer expensive initialization (DB connections, SDKs) until needed. |

### Example

```ts
interface InvoiceService {
  getInvoice(id: string): string;
}

class RealInvoiceService implements InvoiceService {
  getInvoice(id: string): string {
    console.log("Buscando no banco...");
    return `Invoice ${id}`;
  }
}

class InvoiceServiceProxy implements InvoiceService {
  private cache: Record<string, string> = {};

  constructor(private service: InvoiceService) {}

  getInvoice(id: string): string {
    if (!this.cache[id]) {
      this.cache[id] = this.service.getInvoice(id);
    }
    return this.cache[id];
  }
}

// Usage
const service = new InvoiceServiceProxy(new RealInvoiceService());

service.getInvoice("1"); // database
service.getInvoice("1"); // database (cached)
```
