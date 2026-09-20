import { create } from "zustand";

const sessionKey = "training-session";

function getSessionEmail() {
  try {
    return JSON.parse(localStorage.getItem(sessionKey))?.email || "";
  } catch {
    return "";
  }
}

function readUserData(email, type) {
  if (!email) return [];
  try {
    return JSON.parse(localStorage.getItem(`noura-shop-${email}-${type}`)) || [];
  } catch {
    return [];
  }
}

function saveUserData(email, type, value) {
  if (email) {
    localStorage.setItem(`noura-shop-${email}-${type}`, JSON.stringify(value));
  }
}

export const useShopStore = create((set, get) => ({
  activeEmail: getSessionEmail(),
  wishlist: readUserData(getSessionEmail(), "wishlist"),
  cart: readUserData(getSessionEmail(), "cart"),

  setUser: (email) => set({
    activeEmail: email || "",
    wishlist: readUserData(email, "wishlist"),
    cart: readUserData(email, "cart"),
  }),

  toggleWishlist: (product) => {
    const { activeEmail, wishlist, cart } = get();
    if (!activeEmail) return;
    const nextWishlist = wishlist.some((item) => item.id === product.id)
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];
    saveUserData(activeEmail, "wishlist", nextWishlist);
    set({ wishlist: nextWishlist, cart });
  },

  addToCart: (product) => {
    const { activeEmail, wishlist, cart } = get();
    if (!activeEmail) return;
    const existing = cart.find((item) => item.id === product.id);
    const nextCart = existing
      ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];
    saveUserData(activeEmail, "cart", nextCart);
    set({ wishlist, cart: nextCart });
  },

  removeFromCart: (productId) => {
    const { activeEmail, wishlist, cart } = get();
    if (!activeEmail) return;
    const nextCart = cart.filter((item) => item.id !== productId);
    saveUserData(activeEmail, "cart", nextCart);
    set({ wishlist, cart: nextCart });
  },

  updateQuantity: (productId, quantity) => {
    const { activeEmail, wishlist, cart } = get();
    if (!activeEmail) return;
    const nextCart = cart.map((item) => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
    saveUserData(activeEmail, "cart", nextCart);
    set({ wishlist, cart: nextCart });
  },
}));
