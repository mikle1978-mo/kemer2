"use client";

import React from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useRef, useState } from "react";

import meal from "@/public/images/landings/canyon/meal.mp4";
import "./Intro.css";

const Intro = () => {
    const [playVideo, setPlayVideo] = useState(false);
    const vidRef = useRef();

    return (
        <div className='app__video'>
            {/* <video
                ref={vidRef}
                src={meal}
                type='video/mp4'
                loop
                controls={false}
                muted
            /> */}

            <div
                className={
                    playVideo
                        ? "app__video-overlay flex__center play"
                        : "app__video-overlay flex__center "
                }
            >
                <div
                    className='app__video-overlay_circle flex__center'
                    onClick={() => {
                        setPlayVideo(!playVideo);
                        if (playVideo) {
                            vidRef.current.pause();
                        } else {
                            vidRef.current.play();
                        }
                    }}
                >
                    {playVideo ? (
                        <BsPauseFill
                            color='#fff'
                            fontSize={30}
                            className='play'
                        />
                    ) : (
                        <BsFillPlayFill color='#fff' fontSize={30} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Intro;
