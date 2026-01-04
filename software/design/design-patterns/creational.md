# Creational Design Patterns

Creational patterns are concerned with the process of object creation. Their primary goal is to abstract the instantiation process, making the system independent of how its objects are created, composed, and represented. This helps to hide the complexities of object creation, provide more control over the creation process, and increase the system’s flexibility. By decoupling the client from the concrete classes it instantiates, these patterns allow for easier modification of object creation logic without affecting the client code.

- Singleton
- Factory
- Abstract Factory
- Builder
- Prototype

## Singleton

The Singleton pattern ensures that a class has only one instance and provides a global access point to that instance. It's useful when you need exactly one instance of a class to coordinate actions across the system, such as configuration managers, database connections, or resource pools.

### Use cases

| Scenario                 | Description                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Configuration manager    | A single instance that loads and provides access to environment or app configuration. |
| Logger                   | Centralized logging service shared by all modules.                                    |
| Database connection pool | A single pool managing connections to avoid resource exhaustion.                      |

### Example

```ts
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionString: string;

  private constructor() {
    this.connectionString = "postgresql://localhost:5432/mydb";
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    console.log(`Connecting to ${this.connectionString}`);
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true - same instance
db1.connect(); // Connecting to postgresql://localhost:5432/mydb
```

## Factory

The Factory pattern provides an interface for creating objects without specifying their exact classes. The Factory delegates object creation to subclasses, allowing code to work with abstractions rather than concrete implementations. It's useful when you don't know in advance the exact types and dependencies of objects your code will need to create.

### Use cases

| Scenario                | Description                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Payment method creation | Create different payment objects (Credit Card, PIX, Bank Transfer) based on input. |
| File parser selection   | Instantiate CSV, JSON, or XML parsers depending on file type.                      |
| Notification sender     | Create Email, SMS, or Push senders based on user preference.                       |

### Example

```ts
interface Payment {
  pay(): void;
}

class CreditCardPayment implements Payment {
  pay() {}
}

class PixPayment implements Payment {
  pay() {}
}

class PaymentFactory {
  static create(type: "credit" | "pix"): Payment {
    if (type === "credit") return new CreditCardPayment();
    return new PixPayment();
  }
}
```

## Abstract Factory

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. Unlike the simple Factory, Abstract Factory works with multiple product families, ensuring that created products are compatible with each other. It's useful when you need to create sets of objects that must work together.

### Use cases

| Scenario                     | Description                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| Cross-platform UI components | Create buttons, inputs, and dialogs for Web, iOS, and Android.    |
| Multi-cloud infrastructure   | Produce AWS, GCP, or Azure resource implementations consistently. |
| Themed UI systems            | Generate light/dark themed components that must work together.    |

### Example

```ts
// Abstract Products
interface Button {
  render(): void;
}

interface Dialog {
  show(): void;
}

// Abstract Factory
abstract class UIFactory {
  abstract createButton(): Button;
  abstract createDialog(): Dialog;
}

// Concrete Products - Windows
class WindowsButton implements Button {
  render(): void {
    console.log("Rendering Windows button");
  }
}

class WindowsDialog implements Dialog {
  show(): void {
    console.log("Showing Windows dialog");
  }
}

// Concrete Products - Mac
class MacButton implements Button {
  render(): void {
    console.log("Rendering Mac button");
  }
}

class MacDialog implements Dialog {
  show(): void {
    console.log("Showing Mac dialog");
  }
}

// Concrete Factory - Windows
class WindowsUIFactory extends UIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createDialog(): Dialog {
    return new WindowsDialog();
  }
}

// Concrete Factory - Mac
class MacUIFactory extends UIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createDialog(): Dialog {
    return new MacDialog();
  }
}

// Usage
function createUI(factory: UIFactory): void {
  const button = factory.createButton();
  const dialog = factory.createDialog();

  button.render();
  dialog.show();
}

const windowsFactory = new WindowsUIFactory();
createUI(windowsFactory);
// Rendering Windows button
// Showing Windows dialog
```

## Builder

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It's useful when you need to create objects with many optional parameters or when the construction process is complex. The Builder allows constructing objects step by step, providing more control and code readability.

### Use cases

| Scenario                  | Description                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| Complex request objects   | Build API requests with optional headers, query params, and payloads. |
| Invoice or order creation | Assemble invoices with optional discounts, taxes, and metadata.       |
| Configuration objects     | Gradually construct config objects with many optional settings.       |

### Example

```ts
type PizzaSize = "small" | "medium" | "large";
type CrustType = "thin" | "thick" | "stuffed";
type SauceType = "tomato" | "alfredo" | "pesto";

interface Pizza {
  size: PizzaSize | null;
  crust: CrustType | null;
  toppings: string[];
  cheese: boolean;
  sauce: SauceType | null;
}

class PizzaBuilder {
  private pizza: Pizza;

  constructor() {
    this.pizza = {
      size: null,
      crust: null,
      toppings: [],
      cheese: false,
      sauce: null,
    };
  }

  setSize(size: PizzaSize): this {
    this.pizza.size = size;
    return this;
  }

  setCrust(crust: CrustType): this {
    this.pizza.crust = crust;
    return this;
  }

  addTopping(topping: string): this {
    this.pizza.toppings.push(topping);
    return this;
  }

  addCheese(): this {
    this.pizza.cheese = true;
    return this;
  }

  setSauce(sauce: SauceType): this {
    this.pizza.sauce = sauce;
    return this;
  }

  build(): Pizza {
    return this.pizza;
  }
}

// Usage
const pizza = new PizzaBuilder()
  .setSize("large")
  .setCrust("thin")
  .addTopping("pepperoni")
  .addTopping("mushrooms")
  .addCheese()
  .setSauce("tomato")
  .build();

console.log(pizza);
// {
//   size: 'large',
//   crust: 'thin',
//   toppings: ['pepperoni', 'mushrooms'],
//   cheese: true,
//   sauce: 'tomato'
// }
```

## Prototype

The Prototype pattern allows creating new objects by copying existing instances (prototypes), rather than creating objects from scratch. This is especially useful when object creation is costly or complex. The pattern allows cloning objects and modifying only what's necessary, saving resources and simplifying the creation of similar objects.

### Use cases

| Scenario                        | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| Cloning configuration templates | Duplicate default configurations and adjust only what changes.   |
| Game object spawning            | Clone enemies or characters with shared base properties.         |
| Document or form templates      | Copy pre-filled templates instead of recreating them every time. |

### Example

```ts
interface Prototype {
  clone(): Prototype;
}

abstract class Shape implements Prototype {
  public x: number;
  public y: number;
  public color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  clone(): Shape {
    return Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this)
    ) as Shape;
  }

  draw(): void {
    console.log(
      `Drawing shape at (${this.x}, ${this.y}) with color ${this.color}`
    );
  }
}

class Circle extends Shape {
  public radius: number;

  constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color);
    this.radius = radius;
  }

  clone(): Circle {
    const cloned = super.clone() as Circle;
    cloned.radius = this.radius;
    return cloned;
  }

  draw(): void {
    console.log(
      `Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius} and color ${this.color}`
    );
  }
}

// Usage
const originalCircle = new Circle(10, 20, "red", 5);
originalCircle.draw(); // Drawing circle at (10, 20) with radius 5 and color red

const clonedCircle = originalCircle.clone();
clonedCircle.x = 30;
clonedCircle.y = 40;
clonedCircle.color = "blue";
clonedCircle.draw(); // Drawing circle at (30, 40) with radius 5 and color blue

console.log(originalCircle !== clonedCircle); // true - different objects
```
