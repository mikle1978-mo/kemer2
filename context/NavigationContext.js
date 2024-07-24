"use client";

import { createContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <NavigationContext.Provider
            value={{
                open,
                setOpen,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
