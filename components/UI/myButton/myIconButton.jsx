"use client";

import cl from "./myIconButton.module.css";

export default function MyIconButton({ children, ...props }) {
    return (
        <button {...props} className={cl.icon_btn}>
            {children}
        </button>
    );
}
