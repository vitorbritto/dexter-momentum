// Example of composition: Customer with Address and Order resources

class Address {
  constructor(
    public street: string,
    public city: string,
    public country: string
  ) {}

  getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.country}`;
  }
}

class Order {
  constructor(
    public orderId: number,
    public product: string,
    public amount: number
  ) {}

  getOrderSummary(): string {
    return `Order #${this.orderId}: ${this.product} x ${this.amount}`;
  }
}

class Customer {
  private addresses: Address[] = [];
  private orders: Order[] = [];

  constructor(public name: string) {}

  addAddress(address: Address) {
    this.addresses.push(address);
  }

  addOrder(order: Order) {
    this.orders.push(order);
  }

  listAddresses() {
    console.log(`${this.name}'s Addresses:`);
    this.addresses.forEach((address, idx) => {
      console.log(`  [${idx + 1}] ${address.getFullAddress()}`);
    });
  }

  listOrders() {
    console.log(`${this.name}'s Orders:`);
    this.orders.forEach((order, idx) => {
      console.log(`  [${idx + 1}] ${order.getOrderSummary()}`);
    });
  }
}

// Usage example
const customer = new Customer("Alice");
customer.addAddress(new Address("123 Main St", "New York", "USA"));
customer.addAddress(new Address("456 Oak Ave", "Los Angeles", "USA"));

customer.addOrder(new Order(1, "Laptop", 1));
customer.addOrder(new Order(2, "Book", 3));

customer.listAddresses();
customer.listOrders();
