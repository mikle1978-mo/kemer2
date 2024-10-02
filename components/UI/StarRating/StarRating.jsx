import React from "react";

const StarRating = ({
    maxRating = 10,
    rating,
    onSetRating,
    size = 30,
    starColor = "#ffd814",
    textColor = "black",
    isInteractive = true,
}) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    const handleMouseEnter = (id) => {
        if (isInteractive) setHoverRating(id + 1);
    };

    const handleMouseLeave = () => {
        if (isInteractive) setHoverRating(0);
    };

    const handleClick = (id) => {
        if (isInteractive) onSetRating(id + 1);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
                className='star-container'
                style={{ display: "flex", alignItems: "center" }}
            >
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={
                            hoverRating ? hoverRating >= i + 1 : rating >= i + 1
                        }
                        onSetRating={() => handleClick(i)}
                        onSetHoverRating={() => handleMouseEnter(i)}
                        onResetHoverRating={handleMouseLeave}
                        id={i}
                        width={size}
                        starColor={starColor}
                    />
                ))}
            </div>
            <svg
                width='6px'
                height='6px'
                viewBox='0 0 6 6'
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle cx='3' cy='3' r='3' fill='#DBDBDB' />
            </svg>
            <p
                style={{
                    color: textColor,
                    fontSize: `${size / 1.2}px`,
                    margin: 0,
                }}
            >
                {hoverRating || rating || ""}
            </p>
        </div>
    );
};

const Star = ({
    full,
    onSetRating,
    onSetHoverRating,
    onResetHoverRating,
    width,
    starColor,
}) => {
    return (
        <span
            style={{
                display: "block",
                cursor: "pointer",
                padding: `${width / 15}px`,
            }}
            onClick={onSetRating}
            onMouseEnter={onSetHoverRating}
            onMouseLeave={onResetHoverRating}
        >
            {full ? (
                <svg
                    version='1.1'
                    viewBox='0 0 43.128 43.128'
                    fill={starColor}
                    stroke={starColor}
                    width={width} // Размер SVG
                    height={width} // Размер SVG
                >
                    <path d='M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928 c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775 c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z' />
                </svg>
            ) : (
                <svg
                    version='1.1'
                    viewBox='0 0 43.128 43.128'
                    fill='transparent'
                    stroke={starColor}
                    strokeWidth='3'
                    width={width} // Размер SVG
                    height={width} // Размер SVG
                >
                    <path d='M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928 c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775 c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z' />
                </svg>
            )}
        </span>
    );
};

export default StarRating;
