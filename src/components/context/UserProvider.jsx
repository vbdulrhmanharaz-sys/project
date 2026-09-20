import { useState } from "react";
import { userContext } from "./UserContext";
import { useShopStore } from "../../zustand/shopStore";

const accountsKey = "training-accounts";
const sessionKey = "training-session";

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem(accountsKey)) || [];
  } catch {
    return [];
  }
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(sessionKey)) || null;
    } catch {
      return null;
    }
  });

  const handelChange = () => {
    setUserData((currentUser) => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, name: `${currentUser.name} haraz` };
      localStorage.setItem(sessionKey, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const register = ({ name, email, password }) => {
    const accounts = readAccounts();
    if (accounts.some((account) => account.email === email)) {
      return { success: false, message: "An account with this email already exists." };
    }

    const account = { name, email, password };
    localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
    localStorage.setItem(sessionKey, JSON.stringify({ name, email }));
    setUserData({ name, email });
    useShopStore.getState().setUser(email);
    return { success: true };
  };

  const login = ({ email, password }) => {
    const account = readAccounts().find(
      (item) => item.email === email && item.password === password,
    );
    if (!account) {
      return { success: false, message: "Email or password is incorrect." };
    }

    const session = { name: account.name, email: account.email };
    localStorage.setItem(sessionKey, JSON.stringify(session));
    setUserData(session);
    useShopStore.getState().setUser(account.email);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(sessionKey);
    setUserData(null);
    useShopStore.getState().setUser("");
  };

  return (
    <userContext.Provider
      value={{ userData, handelChange, register, login, logout }}
    >
      {children}
    </userContext.Provider>
  );
}