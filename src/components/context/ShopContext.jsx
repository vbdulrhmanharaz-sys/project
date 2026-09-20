import { useContext, useState } from "react";
import { ShopContext } from "./ShopContextDefinition";
import { userContext } from "./UserContext";

function readStorage(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const { userData } = useContext(userContext);
  const storagePrefix = userData?.email ? `noura-shop-${userData.email}` : "";
  const [shopState, setShopState] = useState({ identity: "", wishlist: [], cart: [] });
  const currentState = shopState.identity === storagePrefix
    ? shopState
    : { identity: storagePrefix, wishlist: storagePrefix ? readStorage(`${storagePrefix}-wishlist`) : [], cart: storagePrefix ? readStorage(`${storagePrefix}-cart`) : [] };
  const { wishlist, cart } = currentState;

  const canShop = Boolean(userData?.email);

  const save = (type, value) => {
    if (storagePrefix) {
      localStorage.setItem(`${storagePrefix}-${type}`, JSON.stringify(value));
    }
  };

  const toggleWishlist = (product) => {
    if (!canShop) return;
    setShopState((previous) => {
      const current = previous.identity === storagePrefix ? previous.wishlist : currentState.wishlist;
      const next = current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
      save("wishlist", next);
      return { identity: storagePrefix, wishlist: next, cart: currentState.cart };
    });
  };

  const addToCart = (product) => {
    if (!canShop) return;
    setShopState((previous) => {
      const current = previous.identity === storagePrefix ? previous.cart : currentState.cart;
      const existing = current.find((item) => item.id === product.id);
      const next = existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
      save("cart", next);
      return { identity: storagePrefix, wishlist: currentState.wishlist, cart: next };
    });
  };

  const removeFromCart = (productId) => {
    if (!canShop) return;
    setShopState((previous) => {
      const current = previous.identity === storagePrefix ? previous.cart : currentState.cart;
      const next = current.filter((item) => item.id !== productId);
      save("cart", next);
      return { identity: storagePrefix, wishlist: currentState.wishlist, cart: next };
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (!canShop) return;
    setShopState((previous) => {
      const current = previous.identity === storagePrefix ? previous.cart : currentState.cart;
      const next = current.map((item) => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
      save("cart", next);
      return { identity: storagePrefix, wishlist: currentState.wishlist, cart: next };
    });
  };

  return <ShopContext.Provider value={{ wishlist, cart, canShop, toggleWishlist, addToCart, removeFromCart, updateQuantity }}>{children}</ShopContext.Provider>;
}

