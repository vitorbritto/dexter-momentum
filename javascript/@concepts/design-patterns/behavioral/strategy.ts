interface IItem {
    id: string;
    name: string;
    price: number;
}

interface IOrder {
    id: string;
    customerName: string;
    items: IItem[];
    total: number;
    getTotal(): number;
}

interface IShippingStrategy {
    calculate(order: IOrder): number;
}

class StandardShippingStrategy implements IShippingStrategy {
    calculate(order: IOrder): number {
        return order.total * 0.1;
    }
}

class ExpressShippingStrategy implements IShippingStrategy {
    calculate(order: IOrder): number {
        return order.total * 0.2;
    }
}

class FreeShippingStrategy implements IShippingStrategy {
    calculate(order: IOrder): number {
        return order.total;
    }
}

class Order {
    constructor(
        public id: string,
        public customerName: string,
        public items: IItem[],
        public total: number,
        public shippingStrategy: IShippingStrategy
    ) {}

    getTotal(): number {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    getCustomerName(): string {
        return this.customerName;
    }

    getItems(): IItem[] {
        return this.items;
    }

    calculateShippingCost(): number {
        return this.shippingStrategy.calculate(this);
    }
}

// Usage
const freeShippingOrder = new Order(
    "1",
    "John Doe",
    [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
    ],
    300,
    new FreeShippingStrategy()
);

const standardShippingOrder = new Order(
    "2",
    "Jane Doe",
    [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
    ],
    300,
    new StandardShippingStrategy()
);

const expressShippingOrder = new Order(
    "3",
    "Jim Doe",
    [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
    ],
    300,
    new ExpressShippingStrategy()
);

freeShippingOrder.calculateShippingCost();
standardShippingOrder.calculateShippingCost();
expressShippingOrder.calculateShippingCost();
