import { createContext, useContext, useEffect, useState } from "react";

// Define the dark mode state interface
interface DarkModeState {
  darkMode: boolean | null | undefined;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
}

// Create the DarkModeContext with the DarkModeState interface
const DarkModeContext = createContext<DarkModeState | undefined>(undefined);

// DarkModeContextProvider component
function DarkModeContextProvider({ children }: { children: React.ReactNode }) {
  // Get dark mode state from localStorage (handle potential parsing errors)
  const darkmodeLocalStorage = localStorage.getItem("darkMode");
  const initialDarkMode = darkmodeLocalStorage
    ? JSON.parse(darkmodeLocalStorage)
    : null;

  const [darkMode, setDarkMode] = useState<boolean | null>(initialDarkMode);

  // Update localStorage and document styles based on darkMode state
  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      document.body.style.backgroundColor = darkMode ? "#1F1F1F" : "white";
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook to access DarkModeContext
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "useDarkMode must be used within a DarkModeContextProvider"
    );
  }
  return context;
};

export default DarkModeContextProvider;
