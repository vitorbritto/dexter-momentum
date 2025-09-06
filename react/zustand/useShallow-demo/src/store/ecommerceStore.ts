import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface EcommerceState {
  // Products
  products: Product[];
  filteredProducts: Product[];

  // Cart
  cartItems: CartItem[];

  // Filters
  selectedCategory: string;
  priceRange: [number, number];
  showInStockOnly: boolean;

  // Actions
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setShowInStockOnly: (show: boolean) => void;

  // Computed values
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getFilteredProducts: () => Product[];
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 999,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    price: 699,
    category: "electronics",
    inStock: true,
  },
  { id: "3", name: "T-Shirt", price: 25, category: "clothing", inStock: true },
  { id: "4", name: "Jeans", price: 80, category: "clothing", inStock: false },
  {
    id: "5",
    name: "Programming Book",
    price: 45,
    category: "books",
    inStock: true,
  },
  { id: "6", name: "Novel", price: 15, category: "books", inStock: true },
];

export const useEcommerceStore = create<EcommerceState>((set, get) => ({
  products: sampleProducts,
  filteredProducts: sampleProducts,
  cartItems: [],
  selectedCategory: "all",
  priceRange: [0, 1000],
  showInStockOnly: false,

  addToCart: (productId) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { productId, quantity: 1 }],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  setCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setShowInStockOnly: (show) => set({ showInStockOnly: show }),

  getCartTotal: () => {
    const state = get();
    return state.cartItems.reduce((total, item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  },

  getCartItemCount: () => {
    const state = get();
    return state.cartItems.reduce((count, item) => count + item.quantity, 0);
  },

  getFilteredProducts: () => {
    const state = get();
    let filtered = state.products;

    if (state.selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === state.selectedCategory);
    }

    if (state.showInStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    filtered = filtered.filter(
      (p) => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]
    );

    return filtered;
  },
}));

