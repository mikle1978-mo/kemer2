import AuthContext from "@/context/AuthContext";
import ProductContext from "@/context/ProductContext";
import { getUserReview } from "@/helpers/helpers";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import cl from "./NewReview.module.css";
import MyButton from "../UI/myButton/myButton";

const NewReview = ({ product }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { user } = useContext(AuthContext);
    const { error, clearErrors, postReview } = useContext(ProductContext);

    useEffect(() => {
        const userReview = getUserReview(product?.reviews, user?._id);

        if (userReview) {
            setRating(userReview?.rating);
            setComment(userReview?.comment);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, user]);

    const submitHandler = () => {
        const reviewData = { rating, comment, productId: product?._id };
        postReview(reviewData);
    };

    return (
        <div>
            <hr className='hr' />
            <h1 className='title'>Ваш рейтинг</h1>

            <div className={cl.subtitle}>Рейтинг</div>
            <div className={cl.ratings_wrap}>
                <div className={cl.ratings}>
                    <StarRatings
                        rating={rating}
                        starRatedColor='#ffb829'
                        numberOfStars={5}
                        name='rating'
                        starDimension='18px'
                        starSpacing='1px'
                        changeRating={(e) => setRating(e)}
                    />
                </div>
            </div>
            <div className={cl.comments_wrap}>
                <label className={cl.label}> Коментарии </label>
                <textarea
                    rows='4'
                    className={cl.textarea}
                    placeholder='Ваши коментарии'
                    name='description'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                ></textarea>
            </div>

            <MyButton onClick={() => submitHandler()}>Оставить отзыв</MyButton>
        </div>
    );
};

export default NewReview;
