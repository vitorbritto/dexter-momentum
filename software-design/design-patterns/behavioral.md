# Behavioral Design Patterns

Behavioral patterns are concerned with the algorithms and the assignment of responsibilities among objects. They describe how objects communicate and interact with each other to accomplish a task. The goal is to define efficient, flexible, and loosely coupled communication channels between objects, allowing them to collaborate without becoming overly dependent on each other’s concrete implementations. These patterns focus on the flow of control and data between objects, enabling dynamic behavior and easier extension of functionality.

- Template Method
- Mediator
- Chain of Responsibility
- Observer
- Strategy
- Command
- State
- Visitor
- Interpreter
- Iterator
- Memento

## Template Method

When there is a fixed algorithm, but some steps vary.

### Use cases

1. Import flow (validate → process → save)
2. Jobs batch with standard steps
3. Processing pipeline (ETL)

### Example

```ts
abstract class ImportTemplate {
  run() {
    this.validate();
    this.process();
    this.save();
  }

  protected abstract validate(): void;
  protected abstract process(): void;
  protected save() {
    console.log("Saving...");
  }
}
```

## Mediator

When many objects communicate and become a spaghetti of dependencies.

### Use cases

1. Complex forms (dependent fields)
2. UI component orchestration
3. Communication between modules without direct coupling

### Example

```ts
// Mediator pattern: Communication between modules without direct coupling

interface Mediator {
  notify(sender: string, event: string): void;
}

class ConcreteMediator implements Mediator {
  private moduleA: ModuleA;
  private moduleB: ModuleB;

  setModules(moduleA: ModuleA, moduleB: ModuleB) {
    this.moduleA = moduleA;
    this.moduleB = moduleB;
  }

  notify(sender: string, event: string) {
    if (sender === "A" && event === "requestB") {
      this.moduleB.doSomethingForA();
      return;
    }

    if (sender === "B" && event === "notifyA") {
      this.moduleA.receiveFromB();
      return;
    }
  }
}

class ModuleA {
  constructor(private mediator: Mediator) {}

  doAction() {
    console.log("ModuleA: needs something from B");
    this.mediator.notify("A", "requestB");
  }

  receiveFromB() {
    console.log("ModuleA: received response from B");
  }
}

class ModuleB {
  constructor(private mediator: Mediator) {}

  doSomethingForA() {
    console.log("ModuleB: does something for A, now notifies A");
    this.mediator.notify("B", "notifyA");
  }
}

// Usage
const mediator = new ConcreteMediator();
const a = new ModuleA(mediator);
const b = new ModuleB(mediator);
mediator.setModules(a, b);

a.doAction();
// Output:
// ModuleA: needs something from B
// ModuleB: does something for A, now notifies A
// ModuleA: received response from B
```

## Chain of Responsibility

When a request passes through multiple handlers, but not all need to handle it.

### Use cases

1. Chained validations
2. HTTP middleware
3. Authorization by levels

### Example

```ts
type Request = { headers: Record<string, string>; body?: any };
type Response = { status: number; body: any };

interface Middleware {
  setNext(next: Middleware): Middleware;
  handle(req: Request): Response | undefined;
}

abstract class BaseMiddleware implements Middleware {
  private next?: Middleware;

  setNext(next: Middleware): Middleware {
    this.next = next;
    return next;
  }

  handle(req: Request): Response | undefined {
    if (this.next) {
      return this.next.handle(req);
    }
    return undefined;
  }
}

class AuthMiddleware extends BaseMiddleware {
  handle(req: Request): Response | undefined {
    if (!req.headers["Authorization"]) {
      return { status: 401, body: "Unauthorized" };
    }
    return super.handle(req);
  }
}

class LoggerMiddleware extends BaseMiddleware {
  handle(req: Request): Response | undefined {
    console.log("Request received:", req);
    return super.handle(req);
  }
}

class Controller extends BaseMiddleware {
  handle(req: Request): Response {
    return { status: 200, body: "Success" };
  }
}

// Usage
const logger = new LoggerMiddleware();
const auth = new AuthMiddleware();
const controller = new Controller();

logger.setNext(auth).setNext(controller);

const req1 = { headers: {} };
console.log(logger.handle(req1)); // { status: 401, body: "Unauthorized" }

const req2 = { headers: { Authorization: "abc" } };
console.log(logger.handle(req2)); // { status: 200, body: "Success" }
```

## Observer

When multiple interested parties need to react to an event.

### Use cases

1. UI updates
2. Domain events
3. Notifications

### Example

```ts
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];
  private state: any;

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  setState(state: any) {
    this.state = state;
    this.notify();
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }
}

// Observer Implementations
class UIComponent implements Observer {
  update(data: any) {
    console.log("UI updated with:", data);
  }
}

class Logger implements Observer {
  update(data: any) {
    console.log("Log: New state is", data);
  }
}

// Usage example
const subject = new Subject();
const ui = new UIComponent();
const log = new Logger();

subject.subscribe(ui);
subject.subscribe(log);

subject.setState({ price: 100 });
// Output:
// UI updated with: { price: 100 }
// Log: New state is { price: 100 }

subject.unsubscribe(ui);
subject.setState({ price: 150 });
// Output:
// Log: New state is { price: 150 }
```

## Strategy

When the algorithm varies, but the context is the same.

### Use cases

1. Tax calculation
2. Discount rules
3. Authentication policies

### Example

```ts
interface AuthStrategy {
  authenticate(username: string, password: string): boolean;
}

class LocalAuthStrategy implements AuthStrategy {
  authenticate(username: string, password: string): boolean {
    return username === "admin" && password === "secret";
  }
}

class OAuthStrategy implements AuthStrategy {
  authenticate(username: string, password: string): boolean {
    return true;
  }
}

class Authenticator {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  login(username: string, password: string): boolean {
    return this.strategy.authenticate(username, password);
  }
}

// Usage example
const auth = new Authenticator(new LocalAuthStrategy());
console.log(auth.login("admin", "secret")); // true

auth.setStrategy(new OAuthStrategy());
console.log(auth.login("anyuser", "anypassword")); // true
```

## Command

### Use cases

When actions need to be encapsulated, queued or undone.

1. Queues (SQS, jobs)
2. Undo / redo
3. UI actions

### Example

```ts
interface Command {
  execute(): void;
}

class CreateInvoiceCommand implements Command {
  execute(): void {
    console.log("Invoice created.");
  }
}

class DeleteInvoiceCommand implements Command {
  execute(): void {
    console.log("Invoice deleted.");
  }
}

class CommandInvoker {
  private queue: Command[] = [];

  addCommand(command: Command) {
    this.queue.push(command);
  }

  run() {
    while (this.queue.length > 0) {
      const command = this.queue.shift();
      if (command) {
        command.execute();
      }
    }
  }
}

// Usage example
const invoker = new CommandInvoker();
invoker.addCommand(new CreateInvoiceCommand());
invoker.addCommand(new DeleteInvoiceCommand());
invoker.run(); // "Invoice created." then "Invoice deleted."
```

## State

### Use cases

When the behavior changes according to the internal state.

1. Onboarding flows
2. Order/invoice status
3. Finite State Machines (FSM)

### Example

```ts
interface State {
  handle(context: Context): void;
}

interface Context {
  setState(state: State | null): void;
  next(): void;
}

class WelcomeState implements State {
  handle(context: Context): void {
    console.log("Showing welcome step.");
    context.setState(new PersonalInfoState());
  }
}

class PersonalInfoState implements State {
  handle(context: Context): void {
    console.log("Collecting personal info.");
    context.setState(new PreferencesState());
  }
}

class PreferencesState implements State {
  handle(context: Context): void {
    console.log("Setting preferences.");
    context.setState(null); // End of onboarding
  }
}

class OnboardingContext {
  private state: State | null;

  constructor() {
    this.state = new WelcomeState();
  }

  setState(state: State | null) {
    this.state = state;
  }

  next() {
    if (this.state) {
      this.state.handle(this);
    } else {
      console.log("Onboarding completed!");
    }
  }
}

// Usage example
const onboarding = new OnboardingContext();
onboarding.next(); // "Showing welcome step."
onboarding.next(); // "Collecting personal info."
onboarding.next(); // "Setting preferences."
onboarding.next(); // "Onboarding completed!"
```

## Visitor

### Use cases

When you need to execute different operations on a structure without modifying it.

1. Reports
2. Exportation (PDF, CSV)
3. Tree analysis

### Example

```ts
interface Exportable {
  accept(visitor: ExportVisitor): void;
}

class Order implements Exportable {
  constructor(public id: number, public amount: number) {}

  accept(visitor: ExportVisitor): void {
    visitor.visitOrder(this);
  }
}

class Customer implements Exportable {
  constructor(public name: string, public email: string) {}

  accept(visitor: ExportVisitor): void {
    visitor.visitCustomer(this);
  }
}

interface ExportVisitor {
  visitOrder(order: Order): void;
  visitCustomer(customer: Customer): void;
}

class CsvExportVisitor implements ExportVisitor {
  visitOrder(order: Order): void {
    console.log(`Order,${order.id},${order.amount}`);
  }
  visitCustomer(customer: Customer): void {
    console.log(`Customer,${customer.name},${customer.email}`);
  }
}

// Usage example
const data: Exportable[] = [
  new Order(1001, 250),
  new Customer("Jane Doe", "jane@example.com"),
];

const csvVisitor = new CsvExportVisitor();
for (const item of data) {
  item.accept(csvVisitor);
}
// Output:
// Order,1001,250
// Customer,Jane Doe,jane@example.com
```

## Interpreter

### Use cases

When there is a simple language or declarative rules.

1. Simple business rules
2. Custom filters
3. Conditional expressions

### Example

```ts
// Interpreter Pattern Example: Custom Filters

// Expression interface
interface Expression {
  interpret(context: { [key: string]: any }): boolean;
}

// Concrete Expressions
class EqualsExpression implements Expression {
  constructor(private key: string, private value: any) {}
  interpret(context: { [key: string]: any }): boolean {
    return context[this.key] === this.value;
  }
}

class GreaterThanExpression implements Expression {
  constructor(private key: string, private value: number) {}
  interpret(context: { [key: string]: any }): boolean {
    return context[this.key] > this.value;
  }
}

class AndExpression implements Expression {
  constructor(private expr1: Expression, private expr2: Expression) {}
  interpret(context: { [key: string]: any }): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

// Usage: filter items with amount > 100 AND type === "refund"
const expr = new AndExpression(
  new GreaterThanExpression("amount", 100),
  new EqualsExpression("type", "refund")
);

const items = [
  { amount: 250, type: "refund" },
  { amount: 90, type: "refund" },
  { amount: 140, type: "sale" },
];

const filtered = items.filter((item) => expr.interpret(item));
console.log(filtered); // [{ amount: 250, type: 'refund' }]
```

## Iterator

### Use cases

When you need to traverse a collection without exposing its internal structure.

1. Custom collections
2. Pagination
3. Tree traversal

### Example

```ts
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

class Paginator<T> implements Iterator<T[]> {
  private current = 0;

  constructor(private items: T[], private pageSize: number) {}

  next(): T[] | null {
    if (!this.hasNext()) return null;
    const start = this.current;
    const end = Math.min(start + this.pageSize, this.items.length);
    const page = this.items.slice(start, end);
    this.current = end;
    return page;
  }

  hasNext(): boolean {
    return this.current < this.items.length;
  }
}

// Usage
const data = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);
const paginator = new Paginator(data, 5);

while (paginator.hasNext()) {
  console.log(paginator.next());
}
// Output:
// [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ]
// [ 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10' ]
// [ 'Item 11', 'Item 12' ]
```

## Memento

### Use cases

When you need to save and restore state without violating encapsulation.

1. Undo / rollback
2. Snapshots
3. Drafts

### Example

```ts
interface Memento {
  getState(): string;
}

class EditorMemento implements Memento {
  constructor(private state: string) {}

  getState(): string {
    return this.state;
  }
}

class Editor {
  private content = "";

  setContent(text: string) {
    this.content = text;
  }

  getContent(): string {
    return this.content;
  }

  save(): Memento {
    return new EditorMemento(this.content);
  }

  restore(memento: Memento) {
    this.content = memento.getState();
  }
}

class History {
  private stack: Memento[] = [];

  push(memento: Memento) {
    this.stack.push(memento);
  }

  pop(): Memento | undefined {
    return this.stack.pop();
  }
}

// Usage
const editor = new Editor();
const history = new History();

editor.setContent("Draft v1");
history.push(editor.save());

editor.setContent("Draft v2");
history.push(editor.save());

editor.setContent("Draft v3");
console.log(editor.getContent()); // Draft v3

// Undo once
const prev = history.pop();
if (prev) editor.restore(prev);
console.log(editor.getContent()); // Draft v2

// Undo again
const prev2 = history.pop();
if (prev2) editor.restore(prev2);
console.log(editor.getContent()); // Draft v1
```

## Final rule to remember

- Template → fixed skeleton
- Mediator → centralizes communication
- Chain → passes forward
- Observer → reacts to events
- Strategy → swaps algorithm
- Command → encapsulates action
- State → behavior by state
- Visitor → external operation
- Interpreter → simple language
- Iterator → traverses collection
- Memento → saves/restores state
