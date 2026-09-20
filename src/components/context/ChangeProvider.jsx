import { useState } from "react";
import { changeContext } from "./Them";

export function ChangeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const changeDark = () => {
    setIsDark((previousValue) => !previousValue);
  };

  return (
    <changeContext.Provider value={{ isDark, changeDark }}>
      {children}
    </changeContext.Provider>
  );
}