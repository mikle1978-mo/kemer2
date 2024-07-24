"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cl from "./Search.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";

const Search = ({ name }) => {
    const [keyword, setKeyword] = useState("");

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword) {
            router.push(`/catalog/0/search?keyword=${keyword}`);
        } else {
            router.push("/");
        }
    };

    const resetHandler = () => {
        setKeyword("");
        router.push("/");
    };

    return (
        <form className={cl.search} onSubmit={submitHandler}>
            <input
                id={name}
                name={name}
                className={cl.input}
                type='text'
                placeholder='найти на Kemer-online'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
            />
            {keyword && (
                <button
                    type='button'
                    className={cl.resetButton}
                    onClick={resetHandler}
                >
                    <IoCloseCircleOutline />
                </button>
            )}
        </form>
    );
};

export default Search;
