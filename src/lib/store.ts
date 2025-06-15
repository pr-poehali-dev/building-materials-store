import { create } from "zustand";
import { Product, ProductVariant } from "./products";

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
  ) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // User
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
  ) => Promise<boolean>;
  logout: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Cart state
  cart: [],

  addToCart: (product, variant, quantity = 1) => {
    const { cart } = get();
    const existingItem = cart.find(
      (item) =>
        item.product.id === product.id && item.variant?.id === variant?.id,
    );

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id && item.variant?.id === variant?.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      });
    } else {
      set({
        cart: [...cart, { product, variant, quantity }],
      });
    }
  },

  removeFromCart: (productId, variantId) => {
    set({
      cart: get().cart.filter(
        (item) =>
          !(item.product.id === productId && item.variant?.id === variantId),
      ),
    });
  },

  updateQuantity: (productId, variantId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, variantId);
      return;
    }

    set({
      cart: get().cart.map((item) =>
        item.product.id === productId && item.variant?.id === variantId
          ? { ...item, quantity }
          : item,
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    return get().cart.reduce((total, item) => {
      const price = item.variant?.price || item.product.basePrice;
      return total + price * item.quantity;
    }, 0);
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // User state
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    if (email && password) {
      const user = {
        id: "1",
        name: "Пользователь",
        phone: "+7 (999) 123-45-67",
        email,
      };
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (name, email, password, phone) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful registration
    if (name && email && password && phone) {
      const user = { id: "1", name, phone, email };
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
