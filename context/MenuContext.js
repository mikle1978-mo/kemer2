"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    function toggleMenuMode() {
        setIsActiveMenu(!isActiveMenu);
    }

    return (
        <MenuContext.Provider
            value={{
                isActiveMenu,
                toggleMenuMode,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export default MenuContext;
