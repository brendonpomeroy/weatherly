import { useContext } from "react";
import { CitiesContext } from "./cities-context";

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === null) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};
