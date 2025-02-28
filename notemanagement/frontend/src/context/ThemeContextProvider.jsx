import React, { createContext, useEffect, useState } from "react";
export const ThemeCotext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const divElement = document.querySelector(".addbynewclass");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    console.log(theme,'theme')
    const divElement = document.querySelector(".addbynewclass");
    divElement?.classList.add("maindashboard");
    if (theme === "dark") {
        divElement?.classList.add("maindashboard"); // Dark mode me remove
    }else if(theme === "light"){
        divElement?.classList.remove("maindashboard");
    }
}, [theme]); 

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");

    
  };
  return (
    <ThemeCotext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeCotext.Provider>
  );
};

export default ThemeContextProvider;
