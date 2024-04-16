import React from "react";
// import StarRatings from "react-star-ratings";
import cl from "./Reviews.module.css";
import dynamic from "next/dynamic";

const Reviews = ({ reviews }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });

    return (
        <div className={cl.grid}>
            {reviews?.map((review) => (
                <article className={cl.wrap}>
                    <div className={cl.flex}>
                        <img
                            className={cl.avatar}
                            src={
                                review?.user?.avatar
                                    ? review?.user?.avatar?.url
                                    : "/images/default.png"
                            }
                            alt='user'
                        />
                        <div className={cl.top}>
                            <p>
                                {review?.user?.name}
                                <time className={cl.top_date}>
                                    Дата: {review?.createdAt.substring(0, 10)}
                                </time>
                            </p>
                        </div>
                    </div>

                    <div className={cl.ratings_wrap}>
                        <div className='ratings'>
                            <StarRatings
                                rating={review?.rating}
                                starRatedColor='#ffb829'
                                numberOfStars={5}
                                starDimension='18px'
                                starSpacing='1px'
                                name='rating'
                            />
                        </div>
                        <span className={cl.rating}>{review?.rating}</span>
                    </div>

                    <p className={cl.comment}>{review?.comment}</p>
                </article>
            ))}
        </div>
    );
};

export default Reviews;
