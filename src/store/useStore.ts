import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Product, CartItem, Address, Order } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

interface CartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

interface WishlistState {
  wishlist: string[]; // IDs of products
  toggleWishlist: (productId: string) => void;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) => set((state) => {
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeItem: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        ),
      })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
);

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter((id) => id !== productId)
          : [...state.wishlist, productId],
      })),
    }),
    { name: 'wishlist-storage' }
  )
);

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders],
      })),
    }),
    { name: 'order-storage' }
  )
);
