import { useContext } from "react";
import { ShopContext } from "./ShopContextDefinition";

export function useShop() {
  return useContext(ShopContext);
}
