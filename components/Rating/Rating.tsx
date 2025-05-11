'use client'

import {RatingProps} from "./Rating.props";
import cn from "classnames";
import styles from "./Rating.module.css"
import {useState} from "react";
import {H} from "../Htag/Htag";

export const Rating = ({
                           stars,
                           ...props
                       }: RatingProps) => {
    const renderStars = () => {
        const starsArr = [];
        for (let i = 0; i < stars; i++) {
            starsArr.push(<img key={i} src={"../yellowStar.svg"} alt="yellowStar"/>);
        }
        for (let i = stars; i < 5; i++) {
            starsArr.push(<img key={i} src={"../grayStar.svg"} alt="yellowStar"/>);
        }
        return starsArr;
    };

    return <div>{renderStars()}</div>;
};
