"use client"

import cl from "./myButton.module.css"

export default function MyButton({ children, ...props }) {
    return (
        <button {...props} className={cl.myButton}>
            {children}
        </button>
    )
};
