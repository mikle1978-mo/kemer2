import React, { useState, useCallback, useEffect } from "react";
import { slugs_top, slugs_middle, slugs_buttom } from "@/lib/slugs/slugs";
import cl from "./SlugSelector.module.css";

const slugsByLevel = {
    0: slugs_top,
    1: slugs_middle,
    2: slugs_buttom,
};

const SlugSelector = ({ onSlugsChange }) => {
    const [selectedSlugs, setSelectedSlugs] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState("");

    const handleSlugChange = useCallback((e) => {
        const newSlug = e.target.value;
        if (newSlug) {
            setSelectedSlugs((prev) => [...prev, newSlug]);
            setSelectedSlug(""); // Clear the current value
        }
    }, []);

    const handleRemoveLastSlug = useCallback(() => {
        setSelectedSlugs((prev) => prev.slice(0, -1));
    }, []);

    const currentLevel = selectedSlugs.length;
    const availableSlugs = slugsByLevel[currentLevel] || [];

    useEffect(() => {
        if (onSlugsChange) {
            onSlugsChange(selectedSlugs);
        }
    }, [selectedSlugs]);

    return (
        <div className={cl.slug_selector}>
            {availableSlugs.length > 0 && (
                <div className={cl.slug_input}>
                    <label>{`Выберите слаг ${currentLevel + 1}:`}</label>
                    <select value={selectedSlug} onChange={handleSlugChange}>
                        <option value=''>-- Выберите слаг --</option>
                        {availableSlugs.map((slugObj) => (
                            <option key={slugObj.id} value={slugObj.slug}>
                                {slugObj.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className={cl.selected_slugs}>
                <label>Выбранные слаги:</label>
                <input
                    type='text'
                    readOnly
                    value={selectedSlugs.join(" > ")}
                    className={cl.slug_field}
                />
            </div>

            {currentLevel > 0 && (
                <div className={cl.slug_buttons}>
                    <button onClick={handleRemoveLastSlug}>Удалить</button>
                </div>
            )}
        </div>
    );
};

export default SlugSelector;
