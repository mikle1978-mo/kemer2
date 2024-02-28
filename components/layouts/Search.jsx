"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cl from "./Search.module.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword) {
            router.push(`/?keyword=${keyword}`);
        } else {
            router.push("/");
        }
    };

    return (
        <form className={cl.search} onSubmit={submitHandler}>
            <input
                id='search'
                name='search'
                className={cl.input}
                type='text'
                placeholder='найти на Kemer-online'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
            />
            <button type='button' className={cl.button} onClick={submitHandler}>
                Поиск
            </button>
        </form>
    );
};

export default Search;
