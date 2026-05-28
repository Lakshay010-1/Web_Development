import React, { useContext } from "react";
import { PlacesContext } from "./PlacesContext";

export function usePlacesContext() {
    const context = useContext(PlacesContext);
    if (!context) {
        throw new Error("usePlacesContext must be used within a PlacesContextProvider");
    }
    return context;
}
